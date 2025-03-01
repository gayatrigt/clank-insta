// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const withToken = url.searchParams.get('withToken');
    
    let postsQuery = {};
    
    // If withToken=true, only get posts with a tokenAddress
    if (withToken === 'true') {
      postsQuery = {
        where: {
          tokenAddress: {
            not: null
          },
        },
        include: {
          creator: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      };
    } else {
      // Get all posts
      postsQuery = {
        include: {
          creator: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      };
    }
    
    const posts = await db.post.findMany(postsQuery);
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}