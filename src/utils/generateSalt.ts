import { predictToken_v2 } from './predictToken';

export async function generateSalt_v2(
    deployer: `0x${string}`,
    fid: bigint,
    name: string,
    symbol: string,
    image: string,
    castHash: string,
    supply: bigint,
    pairedTokenAddress: `0x${string}`
): Promise<{ salt: `0x${string}`; token: `0x${string}`; }> {
    const startingPoint = BigInt(
        "0x" +
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
    );
    let i = startingPoint;
    while (true) {
        const salt: `0x${string}` = `0x${i.toString(16).padStart(64, "0")}`;
        const token = await predictToken_v2(
            deployer,
            fid,
            name,
            symbol,
            image,
            castHash,
            supply,
            salt
        );

        const tokenNum = BigInt(token);
        const pairedTokenNum = BigInt(pairedTokenAddress);

        if (tokenNum < pairedTokenNum) {
            return { salt, token };
        }

        i += BigInt(
            Math.floor((crypto.getRandomValues(new Uint8Array(1))[0] ?? 0) % 1000) + 1
        );
    }
}