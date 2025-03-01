/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/api/user/tokens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
    const user = await prisma.user.findFirst({
      where: {
        creatorInstagramUsername: username,
      },
      select: {
        id: true,
        displayPicture: true,
        creatorInstagramUsername: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get all posts that have poolAddress (tokens) for this user
    const userPosts = await prisma.post.findMany({
      where: {
        creatorId: user.id,
        tokenAddress: {
          not: null,
        },
      },
      select: {
        id: true,
        tokenName: true,
        tokenSymbol: true,  
        tokenAddress: true,
        caption: true,
        videoUrl: true,
        thumbnail: true,
        createdAt: true,
      },
    }).then(posts => posts.map(post => {
      const filteredPost: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(post)) {
        if (value !== null && value !== undefined) {
          filteredPost[key] = value;
        }
      }
      return filteredPost;
    }));
    
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