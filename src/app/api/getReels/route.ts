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

        await db.post.createMany({
            data: reelsInfo.map((reel) => ({
                videoUrl: reel?.videoUrl,
                // creatorUserId: reel?.userId,
                // creatorUsername: reel?.username,
                instagramPostId: reel?.postId,
                platform: "instagram",
                caption: reel?.caption,
                creator: {
                    connectOrCreate: {
                        where: {
                            creatorInstagramUserId: reel?.userId,
                        },
                        create: {
                            username: reel?.username,
                            creatorInstagramUserId: reel?.userId,
                            creatorInstagramUsername: reel?.username,
                            displayPicture: reel?.displayPicture
                        }
                    }
                }
            })),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
