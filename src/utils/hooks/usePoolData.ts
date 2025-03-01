/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// hooks/usePoolData.ts
import { useState, useEffect } from 'react';
import { PoolResponse } from '../types/gecko';

interface UsePoolDataProps {
  tokenAddress: string;
  initialData?: PoolResponse;
}

interface UsePoolDataReturn {
  data: PoolResponse | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export async function fetchPoolData(tokenAddress: string): Promise<PoolResponse | null> {
  if (!tokenAddress) return null;

  console.log(`Fetching pool data for ${tokenAddress}`);
  
  try {
    const response = await fetch(`/api/pool?tokenAddress=${tokenAddress}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pool data');
    }
    
    return await response.json() as PoolResponse;
  } catch (error) {
    console.error(`Error fetching pool data for ${tokenAddress}:`, error);
    return null;
  }
}

export function usePoolData({ 
  tokenAddress, 
  initialData 
}: UsePoolDataProps): UsePoolDataReturn {
  const [data, setData] = useState<PoolResponse | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!tokenAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/pool?tokenAddress=${tokenAddress}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pool data');
      }
      
      const result: PoolResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      void fetchData();
    }
  }, [tokenAddress]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
}