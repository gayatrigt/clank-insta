/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/api/user/tokens/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { type Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Instagram username parameter is required' },
        { status: 400 }
      );
    }

    // Find the user by Instagram username
    const users = await prisma.user.findMany({
      where: {
        creatorInstagramUsername: username,
      },
      select: {
        id: true,
        displayPicture: true,
        creatorInstagramUsername: true,
        Post: true
      },
    });

    const user = users[0];

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // flatten the posts
    const userPosts: Post[] = users.reduce<Post[]>((acc, curr) => acc.concat(curr.Post), []);

    // Format the response
    const tokens = userPosts.map(post => ({
      postId: post.id,
      tokenAddress: post.tokenAddress,
      username: user.creatorInstagramUsername,
      displayPicture: user.displayPicture,
      tokenName: post.tokenName,
      tokenSymbol: post.tokenSymbol,
      caption: post.caption,
      videoUrl: post.videoUrl,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt,
    }));

    return NextResponse.json({
      tokens,
    });
  } catch (error) {
    console.error('Error fetching user tokens:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}