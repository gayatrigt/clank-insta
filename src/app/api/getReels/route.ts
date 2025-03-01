import { NextResponse } from "next/server";
import { extractReelInfo, type Media } from "~/utils/extractReelInfo";
import { db } from "~/server/db";
import { env } from '~/env';

export async function GET(request: Request) {
    const { tag } = Object.fromEntries(new URL(request.url).searchParams);
    const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_tag?tag=${tag}&feed_type=recent&corsEnabled=true`;
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

        for (const reel of reelsInfo) {
            if (!reel) {
                continue;
            }

            await db.post.create({
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
                symbol: `INSTA${reel.postId}`,
                fid: CLANKER_FID,
                requestorAddress: CLANKER_WALLET_ADDRESS,
                image: reel.thumbnail,
                castHash: hash,
            });

            await db.post.update({
                where: {
                    instagramPostId: reel.postId,
                },
                data: {
                    tokenAddress,
                    tokenId: hash,
                },
            });
        }

        // deploy a token


        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
