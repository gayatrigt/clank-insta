import { NextResponse } from "next/server";
import { extractReelInfo, type Media } from "~/utils/extractReelInfo";
import { db } from "~/server/db";
import { env } from '~/env';
import { deployToken } from '~/utils/deployToken';
import { CLANKER_FID, CLANKER_WALLET_ADDRESS } from '~/utils/config';

export async function GET(_request: Request) {
    // const { tag } = Object.fromEntries(new URL(request.url).searchParams);
    const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_tag?tag=clanker&feed_type=recent&corsEnabled=true`;
    const headers = {
        "x-rapidapi-host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
        "x-rapidapi-key": env.RAPIDAPI_KEY,
    };

    try {
        const response = await fetch(url, { headers });
        const reels = await response.json() as { data: Media[]; };

        const reelsInfo = reels.data
            .map((reel) => extractReelInfo(reel))
            .filter((reel): reel is ReturnType<typeof extractReelInfo> => reel !== null);

        // console.log("🚀 ~ GET ~ reelsInfo:", reelsInfo);
        for (const reel of reelsInfo) {
            if (!reel) {
                continue;
            }

            // const alreadyExists = await db.post.findFirst({
            //     where: {
            //         instagramPostId: reel?.postId
            //     }
            // });

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

            const { hash, tokenAddress } = await deployToken({
                postId: reel.postId,
                name: reel.username,
                symbol: `INSTA${postRes.id}`,
                fid: CLANKER_FID,
                requestorAddress: CLANKER_WALLET_ADDRESS,
                image: reel.thumbnail ?? "",
                castHash: "",
            });
            console.log("🚀 ~ GET ~ hash, tokenAddress:", hash, tokenAddress);

            await db.post.update({
                where: {
                    id: postRes.id,
                },
                data: {
                    tokenSymbol: `INSTA${postRes.id}`,
                    tokenName: `INSTA${postRes.id}`,
                    tokenAddress,
                    transactionHash: hash,
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
