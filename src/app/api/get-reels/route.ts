/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { env } from '~/env';
import { db } from "~/server/db";
import { CLANKER_FID, CLANKER_WALLET_ADDRESS } from '~/utils/config';
import { deployTokenClanker } from '~/utils/deployTokenClanker';
import { deployToken } from '~/utils/deployTokenNeynar';
import { extractReelInfo, type Media } from "~/utils/extractReelInfo";
import { parseCaption } from '~/utils/parseCaption';

export async function GET(_request: Request) {
    // const { tag } = Object.fromEntries(new URL(request.url).searchParams);
    const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=72446861262&response_type=reels`;
    const headers = {
        "x-rapidapi-host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
        "x-rapidapi-key": env.RAPIDAPI_KEY,
    };

    try {
        const response = await fetch(url, { headers });
        const reelsResp = await response.json() as {
            reels: {
                data: {
                    media: Media;
                }[];
            };
            error?: string;
            message?: string;
        }[];


        if (reelsResp[0]?.error) {
            throw new Error(reelsResp[0].message);
        }
        console.log("🚀 ~ GET ~ reelsResp:", reelsResp);

        const reels = reelsResp[0]?.reels?.data.map(a => a.media);

        if (!reels?.length) {
            throw new Error('Reels not found');
        }

        console.log("🚀 ~ GET ~ reels:", reelsResp);
        const reelsInfo = reels
            .map((reel) => extractReelInfo(reel))
            .filter((reel): reel is ReturnType<typeof extractReelInfo> => reel !== null);

        console.log("🚀 ~ GET ~ reelsInfo:", reelsInfo);
        console.log("🚀 ~ GET ~ reelsInfo:", reelsInfo.length);
        // console.log("🚀 ~ GET ~ reelsInfo:", reelsInfo);
        for (const reel of reelsInfo) {
            if (!reel) {
                continue;
            }

            const alreadyExists = await db.post.findFirst({
                where: {
                    instagramPostId: reel?.postId
                }
            });
            console.log("🚀 ~ GET ~ alreadyExists:", alreadyExists);

            if (alreadyExists?.tokenAddress) continue;

            const postRes = await db.post.create({
                data: {
                    videoUrl: reel.videoUrl,
                    // creatorUserId: reel?.userId,
                    // creatorUsername: reel?.username,
                    instagramPostId: reel?.postId,
                    platform: "instagram",
                    caption: reel?.caption,
                    thumbnail: reel?.thumbnail,
                    creator: {
                        connectOrCreate: {
                            where: {
                                creatorInstagramUserId: reel?.userId,
                            },
                            create: {
                                creatorInstagramUserId: reel?.userId,
                                creatorInstagramUsername: reel?.username,
                                displayPicture: reel?.displayPicture
                            }
                        }
                    }
                }
            });
            console.log("🚀 ~ GET ~ postRes:", postRes.id);

            const { title, symbol } = await parseCaption(reel.caption);

            const { tokenAddress } = await deployTokenClanker({
                postId: reel.postId,
                name: title,
                symbol: symbol,
                requestorAddress: CLANKER_WALLET_ADDRESS,
                image: reel.thumbnail ?? "",
                castHash: "",
            });

            // const deploymentResp = await deployToken({
            //     // postId: reel.postId,
            //     name: title,
            //     symbol: symbol,
            //     // fid: CLANKER_FID,
            //     owner: CLANKER_WALLET_ADDRESS,
            //     description: reel.caption,
            //     // image: reel.thumbnail ?? "",
            //     // castHash: "",
            // });

            // const { hash, tokenAddress } = deploymentResp;
            // const tokenAddress = deploymentResp.contract.fungible.address;

            await db.post.update({
                where: {
                    id: Number(postRes.id),
                },
                data: {
                    tokenSymbol: symbol,
                    tokenName: title,
                    tokenAddress: String(tokenAddress),
                    requestorAddress: CLANKER_WALLET_ADDRESS
                },
            });

        }

        return NextResponse.json({ success: true, reels });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 }); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    }
}
