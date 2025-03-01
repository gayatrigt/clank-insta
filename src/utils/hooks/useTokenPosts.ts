/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// hooks/useTokenPosts.ts
import { useState, useEffect } from 'react';
import { PoolResponse } from '../types/gecko';
import { fetchPoolData } from './usePoolData';

// Define the Post type from Prisma
interface Creator {
  id: number;
  creatorInstagramUserId: string;
  creatorInstagramUsername: string;
  privyId: string | null;
  privySubject: string | null;
  smartWalletAddress: string | null;
  privyWalletAddress: string | null;
  displayPicture: string | null;
}

interface Post {
  id: number;
  platform: 'instagram' | 'tiktok';
  caption: string;
  createdAt: string;
  updatedAt: string;
  tokenAddress: string | null;
  tokenName: string | null;
  tokenSymbol: string | null;
  poolAddress: string | null;
  platformRewardsAddress: string | null;
  requestorAddress: string | null;
  transactionHash: string | null;
  videoUrl: string;
  instagramPostId: string | null;
  thumbnail: string | null;
  creatorId: number | null;
  creator: Creator | null;
}

// Define the combined type
export interface TokenPost extends Post {
  poolData: PoolResponse | null;
}

export interface UseTokenPostsReturn {
  posts: TokenPost[];
  isLoadingData: boolean;
  errorData: Error | null;
  refetch: () => Promise<void>;
}

export function useTokenPosts(): UseTokenPostsReturn {
  const [posts, setPosts] = useState<TokenPost[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [errorData, setErrorData] = useState<Error | null>(null);

  const fetchPosts = async () => {
    setIsLoadingData(true);
    setErrorData(null);
    
    try {
      // Fetch posts with token addresses
      const response = await fetch('/api/posts?withToken=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      const postsWithToken = data.posts as Post[];
      
      // Fetch pool data for each post
      const postsWithPoolDataPromises = postsWithToken.map(async (post) => {
        if (!post.tokenAddress) {
          return { ...post, poolData: null };
        }
        
        const poolData = await fetchPoolData(post.tokenAddress);
        return { ...post, poolData };
      });
      
      const postsWithPoolData = await Promise.all(postsWithPoolDataPromises);
      setPosts(postsWithPoolData);
    } catch (err) {
      setErrorData(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  const refetch = async () => {
    await fetchPosts();
  };

  return { posts, isLoadingData, errorData, refetch };
}