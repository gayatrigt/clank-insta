/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { extractReelInfo, type Media } from "~/utils/extractReelInfo";
import { db } from "~/server/db";
import { env } from '~/env';
import { deployToken } from '~/utils/deployToken';
import { CLANKER_FID, CLANKER_WALLET_ADDRESS } from '~/utils/config';
import { parseCaption } from '~/utils/parseCaption';

export async function GET(_request: Request) {
    // const { tag } = Object.fromEntries(new URL(request.url).searchParams);
    const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_tag?tag=dogs&feed_type=recent&corsEnabled=true`;
    const headers = {
        "x-rapidapi-host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
        "x-rapidapi-key": env.RAPIDAPI_KEY,
    };

    try {
        const response = await fetch(url, { headers });
        const reels = await response.json() as { data: Media[]; };

        console.log("🚀 ~ GET ~ reels:", reels);
        const reelsInfo = reels.data
            .map((reel) => extractReelInfo(reel))
            .filter((reel): reel is ReturnType<typeof extractReelInfo> => reel !== null)
            .slice(0, 1);

        console.log("🚀 ~ GET ~ reelsInfo:", reelsInfo);
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

            // if (alreadyExists) continue;

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

            const { hash, tokenAddress } = await deployToken({
                postId: reel.postId,
                name: title,
                symbol: symbol,
                fid: CLANKER_FID,
                requestorAddress: CLANKER_WALLET_ADDRESS,
                image: reel.thumbnail ?? "",
                castHash: "",
            });
            console.log("🚀 ~ GET ~ hash, tokenAddress:", hash, tokenAddress);
            console.log("🚀 ~ GET ~ ", {
                tokenSymbol: symbol,
                tokenName: title,
                tokenAddress: String(tokenAddress),
                transactionHash: String(hash),
                requestorAddress: CLANKER_WALLET_ADDRESS
            });

            await db.post.update({
                where: {
                    id: Number(postRes.id),
                },
                data: {
                    tokenSymbol: symbol,
                    tokenName: title,
                    tokenAddress: String(tokenAddress),
                    transactionHash: String(hash),
                    requestorAddress: CLANKER_WALLET_ADDRESS
                },
            });

        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
