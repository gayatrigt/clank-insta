import { createPublicClient, createWalletClient, http } from 'viem';
export interface TokenParams {
    name: string;
    symbol: string;
    supply: bigint;
    initialTick: number;
    fee: number;
}

export interface PoolConfig {
    tick: number;
    pairedToken: `0x${string}`;
    devBuyFee: number;
}

export interface GenerateSaltResult {
    salt: `0x${string}`;
    token: `0x${string}`;
}

// deployToken.ts
import {
    encodeFunctionData,
    parseUnits
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { db } from '~/server/db';
import { CLANKER_FACTORY_ABI } from '../abi/v2/Clanker';
import { CLANKER_FACTORY_V3, CLANKER_WALLET_ADDRESS, WETH_ADDRESS } from './config';
import { generateSalt_v2 } from './generateSalt';
// import { saveDeployedToken } from './saveDeployedToken';

console.log("🚀 ~ process.env.PRIVATE_KEY:", process.env.PRIVATE_KEY);

export const account = privateKeyToAccount(
    process.env.PRIVATE_KEY as `0x${string}`,
);

const walletClient = createWalletClient({
    chain: base,
    transport: http(),
    account,
});

// Configure clients
const publicClient = createPublicClient({
    chain: base,
    transport: http(),
});

export const calculateInitialTick = (_priceInETH: number): number => {
    const desiredPrice = 0.0000000001;
    const logBase = 1.0001;
    const tickSpacing = 200;

    const rawTick = Math.log(desiredPrice) / Math.log(logBase);
    const initialTick = Math.floor(rawTick / tickSpacing) * tickSpacing;

    return initialTick;
};

export const deployToken = async ({
    postId,
    name,
    symbol,
    fid,
    requestorAddress,
    image,
    castHash,
}: {
    postId: number;
    name: string;
    symbol: string;
    fid: number;
    requestorAddress: `0x${string}`;
    image: string;
    castHash: string;
}): Promise<{ hash: `0x${string}`, tokenAddress: `0x${string}`; }> => {
    try {
        const initialTick = calculateInitialTick(0.01);

        const tokenParams: TokenParams = {
            name,
            symbol,
            supply: BigInt(parseUnits("100000000000", 18).toString()),
            initialTick,
            fee: 10000,
        };

        // Generate salt for token deployment
        const { salt, token: predictedTokenAddress }: GenerateSaltResult = await generateSalt_v2(
            requestorAddress,
            BigInt(fid),
            tokenParams.name,
            tokenParams.symbol,
            image || "",
            castHash,
            tokenParams.supply,
            WETH_ADDRESS
        );
        console.log("🚀 ~ predictedTokenAddress:", predictedTokenAddress);

        const poolConfig: PoolConfig = {
            tick: tokenParams.initialTick,
            pairedToken: WETH_ADDRESS,
            devBuyFee: 10000,
        };

        // Prepare deployment transaction
        const deployCalldata = encodeFunctionData({
            abi: CLANKER_FACTORY_ABI,
            functionName: "deployToken",
            args: [
                tokenParams.name,
                tokenParams.symbol,
                tokenParams.supply,
                tokenParams.fee,
                salt,
                requestorAddress,
                BigInt(fid),
                image || "",
                castHash,
                poolConfig,
            ],
        });

        // Get current nonce
        const nonce = await publicClient.getTransactionCount({
            address: account.address,
        });

        // Estimate gas fees
        const { maxFeePerGas, maxPriorityFeePerGas } =
            await publicClient.estimateFeesPerGas();

        // Send transaction
        const hash = await walletClient.sendTransaction({
            to: CLANKER_FACTORY_V3,
            data: deployCalldata,
            account: account,
            nonce,
            maxFeePerGas,
            maxPriorityFeePerGas,
        });

        await db.post.update({
            where: {
                id: postId,
            },
            data: {
                tokenAddress: predictedTokenAddress,
                poolAddress: CLANKER_FACTORY_V3,
                platformRewardsAddress: CLANKER_WALLET_ADDRESS,
                requestorAddress: CLANKER_WALLET_ADDRESS,
                transactionHash: hash
            }
        });

        // await saveDeployedToken({
        //     name,
        //     symbol,
        //     imgUrl: image,
        //     requestorAddress: CLANKER_WALLET_ADDRESS,
        //     hash: "",
        //     poolAddress: CLANKER_FACTORY_V3,
        //     tokenAddress: predictedTokenAddress,
        //     authorFid: CLANKER_FID,
        //     platformRewardsAddress: CLANKER_WALLET_ADDRESS
        // });

        return { hash, tokenAddress: predictedTokenAddress };
    } catch (error) {
        console.error('Error deploying token:', error);
        throw new Error(`Failed to deploy token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};