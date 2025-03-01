import { encodeAbiParameters, encodePacked, keccak256 } from 'viem';
import { clankerTokenArtifact } from '../abi/v2/ClankerToken';
import { CLANKER_FACTORY_V2 } from './config';

export async function predictToken_v2(
    deployer: `0x${string}`,
    fid: bigint,
    name: string,
    symbol: string,
    image: string,
    castHash: string,
    supply: bigint,
    salt: `0x${string}`
): Promise<`0x${string}`> {
    const create2Salt = keccak256(
        encodeAbiParameters(
            [{ type: "address" }, { type: "bytes32" }],
            [deployer, salt]
        )
    );

    const constructorArgs = encodeAbiParameters(
        [
            { type: "string" },
            { type: "string" },
            { type: "uint256" },
            { type: "address" },
            { type: "uint256" },
            { type: "string" },
            { type: "string" },
        ],
        [name, symbol, supply, deployer, fid, image, castHash]
    );

    const creationCode = clankerTokenArtifact.bytecode.object as `0x${string}`;

    const encodedCreationCode = encodePacked(
        ["bytes", "bytes"],
        [creationCode, constructorArgs]
    );
    const creationCodeHash = keccak256(encodedCreationCode);

    const hash = keccak256(
        encodePacked(
            ["uint8", "address", "bytes32", "bytes32"],
            [0xff, CLANKER_FACTORY_V2, create2Salt, creationCodeHash]
        )
    );
    console.log("🚀 ~ hash:", hash);

    return `0x${hash.slice(-40)}`;
}
