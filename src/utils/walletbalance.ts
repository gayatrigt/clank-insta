import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { publicClient } from './client';

// Custom hook for fetching and caching balance
export const useWalletBalance = (address: string | undefined) => {
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    // Don't attempt to fetch if there's no address
    if (!address) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetchBalance = async () => {
      try {
        // Type guard for address format
        const formattedAddress = address as `0x${string}`;
        
        const balanceWei = await publicClient.getBalance({
          address: formattedAddress,
        });

        if (isMounted) {
          const balanceEther = formatEther(balanceWei);
          // Format to 4 decimal places
          setBalance(Number(balanceEther).toFixed(4));
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching balance:', err);
          setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
          setIsLoading(false);
        }
      }
    };

    // Use a debounce to avoid too many calls
    const debounceTimer = setTimeout(() => {
      void fetchBalance();
    }, 300);

    // Clean up
    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [address, publicClient]);

  // Function to manually refresh balance (can be called on user action)
  const refreshBalance = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formattedAddress = address as `0x${string}`;
      const balanceWei = await publicClient.getBalance({
        address: formattedAddress,
      });
      
      const balanceEther = formatEther(balanceWei);
      setBalance(Number(balanceEther).toFixed(4));
    } catch (err) {
      console.error('Error refreshing balance:', err);
      setError(err instanceof Error ? err : new Error('Failed to refresh balance'));
    } finally {
      setIsLoading(false);
    }
  };

  return { balance, isLoading, error, refreshBalance };
};

// Example usage in component:
/*
import { useWalletBalance } from './path-to-this-file';

function WalletInfo({ address }) {
  const { balance, isLoading, error, refreshBalance } = useWalletBalance(address);

  return (
    <div>
      {isLoading ? (
        <p>Loading balance...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <p>Balance: {balance} ETH</p>
          <button onClick={refreshBalance}>Refresh</button>
        </div>
      )}
    </div>
  );
}
*/