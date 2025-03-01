/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// hooks/useUserTokens.ts
import { useState, useEffect } from 'react';
import { PoolResponse } from '../types/gecko';

export interface TokenData {
  id: string;
  name: string;
  description: string;
  address: string;
  price: number;
  priceUsd: string;
  holders: number;
  marketCapUsd: string;
  changePercentage: string;
  videoUrl?: string;
  thumbnail?: string | null;
  caption?: string;
  postId?: number;
  username: string;
  displayPicture: string;
}

export interface APIToken {
  postId: number;
  tokenAddress: string | null;
  username: string;
  displayPicture: string;
  tokenName: string | null;
  tokenSymbol: string | null;
  caption: string;
  videoUrl: string;
  thumbnail: string | null;
  createdAt: string;
}

interface UseUserTokensReturn {
  tokens: TokenData[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUserTokens(instagramUsername: string | undefined): UseUserTokensReturn {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [apiTokens, setApiTokens] = useState<APIToken[]>([]);
  
  // First, fetch the tokens data for this user
  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!instagramUsername) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/user/tokens?username=${encodeURIComponent(instagramUsername)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user tokens');
        }
        
        const data = await response.json();
        setApiTokens(data.tokens || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    };
    
    void fetchUserTokens();
  }, [instagramUsername]);

  // Now for each pool address, fetch the pool data
  const fetchPoolsData = async () => {
    if (apiTokens.length === 0) {
      setTokens([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const tokenPromises = apiTokens
        .filter(token => token.tokenAddress) // Filter out tokens without pool addresses
        .map(async (token) => {
          const tokenAddress = token.tokenAddress;
          const response = await fetch(`/api/pool?tokenAdress=${tokenAddress}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch pool data for ${token.tokenAddress}`);
          }
          
          const poolData: PoolResponse = await response.json();
          const pool = poolData.data;
          
          return {
            id: pool.id,
            name: token.tokenName || (pool.attributes.name?.split('/')[0]?.trim() ?? 'Unknown'),
            description: token.caption || `Pool created at ${new Date(pool.attributes.pool_created_at).toLocaleDateString()}. 24h volume: $${Number(pool.attributes.volume_usd.h24).toLocaleString()}`,
            address: pool.attributes.address,
            price: parseFloat(pool.attributes.base_token_price_native_currency),
            priceUsd: pool.attributes.base_token_price_usd,
            holders: pool.attributes.transactions.h24.buyers,
            marketCapUsd: pool.attributes.market_cap_usd,
            changePercentage: pool.attributes.price_change_percentage.h24,
            videoUrl: token.videoUrl,
            thumbnail: token.thumbnail || null,
            postId: token.postId,
            username: token.username,
            displayPicture: token.displayPicture,
          };
        });
      
      const resolvedTokens = await Promise.all(tokenPromises);
      setTokens(resolvedTokens);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching pool data'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    void fetchPoolsData();
  }, [apiTokens]);
  
  const refetch = async () => {
    await fetchPoolsData();
  };
  
  return { tokens, isLoading, error, refetch };
}