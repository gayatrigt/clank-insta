import { env } from '~/env';

type DeployTokenResponse = {
    error: string | undefined;
    contract: {
        fungible: {
            object: string,
            name: string,
            symbol: string,
            media: string,
            address: string,
            decimals: number,
        };
    };
};

export const deployToken = async ({
    owner,
    symbol,
    name,
    description,
    nsfw = false,
    network = "base",
    factory = "clanker",
}: {
    owner: string;
    symbol: string;
    name: string;
    description: string;
    nsfw?: boolean;
    network?: string;
    factory?: string;
}): Promise<DeployTokenResponse> => {

    const response = await fetch('https://api.neynar.com/fungible', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.NEYNAR_API_KEY}`
        },
        body: JSON.stringify({
            owner,
            symbol,
            name,
            metadata: {
                description,
                nsfw: nsfw ? 'true' : 'false'
            },
            network,
            factory
        })
    });
    const data = await response.json() as DeployTokenResponse;

    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
};
