/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
'use client';

import { useFundWallet, usePrivy } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { encodeFunctionData, erc721Abi } from "viem";
import { base } from "viem/chains";
import { mintAbi } from "~/components/mint";

const NFT_CONTRACT_ADDRESS =
    "0x3331AfB9805ccF5d6cb1657a8deD0677884604A7" as const;

export default function DashboardPage() {
    const router = useRouter();
    const { ready, authenticated, user, logout } = usePrivy();
    const { client } = useSmartWallets();
    const { fundWallet } = useFundWallet();

    useEffect(() => {
        if (ready && !authenticated && !user) {
            router.push("/");
        }
    }, [ready, authenticated, router, user]);

    const uiOptions = {
        title: 'Sample title text',
        description: 'Sample description text',
        buttonText: 'Sample button text',
    };
    const transactionRequest = {
        chain: base,
        to: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with a valid Ethereum address
        value: BigInt(0.00001 * 10 ** 18), // Convert 0.1 ETH to wei
    };

    const onMint = async () => {

        console.log("Minting NFT");

        if (!client) return;

        const add = client.account.address

        const txHash = await client.sendTransaction(transactionRequest, { uiOptions });

        client.sendTransaction({
            to: NFT_CONTRACT_ADDRESS,
            data: encodeFunctionData({
                abi: mintAbi,
                functionName: "mint",
                args: [client.account.address],
            }),
        });
    };

    // const onSetApprovalForAll = () => {
    //     if (!smartWalletClient) return;

    //     console.log("Setting approval for all");
    //     smartWalletClient.sendTransaction({
    //         to: NFT_CONTRACT_ADDRESS,
    //         data: encodeFunctionData({
    //             abi: erc721Abi,
    //             functionName: "setApprovalForAll",
    //             args: [smartWalletClient.account.address, true],
    //         }),
    //     });
    // };

    // const onBatchTransaction = () => {
    //     if (!smartWalletClient) return;
    //     smartWalletClient.sendTransaction({
    //         account: smartWalletClient.account,
    //         calls: [
    //             {
    //                 to: NFT_CONTRACT_ADDRESS,
    //                 data: encodeFunctionData({
    //                     abi: mintAbi,
    //                     functionName: "mint",
    //                     args: [smartWalletClient.account.address],
    //                 }),
    //             },
    //             {
    //                 to: NFT_CONTRACT_ADDRESS,
    //                 data: encodeFunctionData({
    //                     abi: erc721Abi,
    //                     functionName: "setApprovalForAll",
    //                     args: [smartWalletClient.account.address, true],
    //                 }),
    //             },
    //         ],
    //     });
    // };

    return (
        <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
            {ready && authenticated && client ? (
                <>
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-semibold">
                            Privy Smart Wallets Demo
                        </h1>
                        <button
                            onClick={logout}
                            className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="mt-12 flex gap-4 flex-wrap">
                        <button
                            onClick={onMint}
                            className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                        >
                            Mint NFT
                        </button>
                        <button
                            // onClick={onSetApprovalForAll}
                            className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                        >
                            Approve
                        </button>
                        <button
                            // onClick={onBatchTransaction}
                            className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                        >
                            Batch Transaction
                        </button>
                    </div>
                    <p className="mt-6 font-bold uppercase text-sm text-gray-600">
                        User object
                    </p>
                    <pre className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </>
            ) : null}
        </main>
    );
}