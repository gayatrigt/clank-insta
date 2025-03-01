/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Share2, Play, Pause, Volume2, VolumeX, DollarSign, Wallet, ChevronDown, ChevronUp, CreditCard, LogOut } from "lucide-react";
import Image from "next/image";
import { useFundWallet, usePrivy } from '@privy-io/react-auth';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { usePoolData } from '~/utils/hooks/usePoolData';
import { useWalletBalance } from '~/utils/walletbalance';
import { useTokenPosts } from '~/utils/hooks/useTokenPosts';
import sdk from "@farcaster/frame-sdk";

const frameMetadata = {
    version: "next",
    imageUrl: "https://clank-insta.vercel.app/preview-image.png", // Replace with your actual preview image URL (3:2 ratio)
    button: {
        title: "Trade on Clank.Insta",
        action: {
            type: "launch_frame",
            name: "Clank.Insta",
            url: "https://www.clank.in/frame", // Replace with your actual URL
            splashImageUrl: "https://clank-insta.vercel.app/splash.png", // Replace with your 200x200px splash image URL
            splashBackgroundColor: "#0f172a" // Slate background color to match your UI
        }
    }
};

// Define types for token data based on our API response
interface TokenData {
    id: string;
    name: string;
    address: string;
    creatorName: string;
    creatorHandle: string;
    price: number;
    priceUsd: string;
    change: number;
    videoUrl: string;
    likes: number;
    holders: number;
    description: string;
    creatorAvatar: string | null;
    postId: number;
}

const TradeReelsFeed = () => {
    const { posts, isLoadingData, errorData } = useTokenPosts();
    // State for tokens
    const [tokens, setTokens] = useState<TokenData[]>([]);
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);

    useEffect(() => {
        const loadFrameSDK = async () => {
            try {
                await sdk.context;
                void sdk.actions.ready();
                setIsSDKLoaded(true);
            } catch (error) {
                console.error('Error loading Farcaster Frame SDK:', error);
            }
        };

        if (!isSDKLoaded) {
            void loadFrameSDK();
        }
    }, [isSDKLoaded]);

    // Process the posts and pool data when they change
    useEffect(() => {
        if (!posts.length) return;

        const processedTokens: TokenData[] = posts.map((post) => {
            // Default values if pool data is not available
            let price = 0;
            let priceUsd = "0";
            let change = 0;
            let holders = 0;
            let marketCap = "0";
            let volume = "0";
            let poolCreatedAt = new Date().toLocaleDateString();

            // Extract pool data if available
            if (post.poolData?.data) {
                const pool = post.poolData.data;
                price = parseFloat(pool.attributes.base_token_price_native_currency);
                priceUsd = pool.attributes.base_token_price_usd;
                change = 0;
                holders = 0;
                marketCap = pool.attributes.market_cap_usd;
                volume = pool.attributes.volume_usd.h24;
                poolCreatedAt = new Date(pool.attributes.pool_created_at).toLocaleDateString();
            }

            // Generate a handle from creator's username or use a placeholder
            const creatorHandle = post.creator?.creatorInstagramUsername
                ? `@${post.creator.creatorInstagramUsername}`
                : post.tokenSymbol
                    ? `@${post.tokenSymbol.toLowerCase()}`
                    : '@unknown';

            // Format the name from post data
            const name = post.tokenName || 'Unknown Token';

            return {
                id: post.poolAddress || `post-${post.id}`,
                postId: post.id,
                name: name,
                address: post.tokenAddress || '',
                creatorName: post.creator?.creatorInstagramUsername || 'Unknown Creator',
                creatorHandle: creatorHandle,
                price: price,
                priceUsd: priceUsd,
                change: change,
                videoUrl: post.videoUrl,
                likes: Math.floor(Math.random() * 3000) + 1000, // Placeholder data
                holders: holders,
                description: `${post.caption || ''}\n Market cap: $${Number(marketCap).toLocaleString()}, 24h volume: $${Number(volume).toLocaleString()}`,
                creatorAvatar: post.creator?.displayPicture || null
            };
        });

        setTokens(processedTokens);
    }, [posts]);

    console.log(posts);

    const [inViewVideos, setInViewVideos] = useState<Record<string, boolean>>({});
    const { ready, authenticated, user, logout } = usePrivy();
    const { client } = useSmartWallets();
    const walletAddress = user?.smartWallet?.address;
    const { fundWallet } = useFundWallet();
    const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
    const [isMuted, setIsMuted] = useState(true);
    const [showBuyModal, setShowBuyModal] = useState<string | null>(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
    const [showWalletMenu, setShowWalletMenu] = useState(false);
    const walletMenuRef = useRef<HTMLDivElement | null>(null);
    const { balance, isLoading, error, refreshBalance } = useWalletBalance(walletAddress);

    useEffect(() => {
        const observers: Record<string, IntersectionObserver> = {};

        tokens.forEach((token) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry) {
                        const isInView = entry.isIntersecting;
                        setInViewVideos(prev => ({ ...prev, [token.id]: isInView }));

                        // Auto-play/pause videos when they come into view
                        if (isInView) {
                            const videoElement = videoRefs.current[token.id];
                            if (videoElement) {
                                videoElement.play()
                                    .then(() => {
                                        setPlayingVideos(prev => ({ ...prev, [token.id]: true }));
                                    })
                                    .catch(err => console.error("Error playing video:", err));
                            }
                        } else {
                            const videoElement = videoRefs.current[token.id];
                            if (videoElement) {
                                videoElement.pause();
                                setPlayingVideos(prev => ({ ...prev, [token.id]: false }));
                            }
                        }
                    }
                },
                { threshold: 0.6 }
            );

            const element = document.getElementById(`video-${token.id}`);
            if (element) {
                observer.observe(element);
                observers[token.id] = observer;
            }
        });

        return () => {
            Object.values(observers).forEach(observer => observer.disconnect());
        };
    }, [tokens]);

    // Helper functions
    const truncateAddress = (address: string) => {
        return address.length > 10 ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : address;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Address copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
                setShowWalletMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShare = async (token: TokenData) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${token.name} by ${token.creatorName}`,
                    url: `/token/${token.id}`,
                });
            } catch (error) {
                console.log('Error sharing content:', error);
            }
        } else {
            console.log('Web Share API not supported');
            // Fallback copy to clipboard
        }
    };

    const handleBuy = (tokenAddress: string) => {
        // Create the Uniswap URL with the token address
        const uniswapUrl = `https://app.uniswap.org/explore/tokens/base/${tokenAddress}`;

        // Open in a new tab
        window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
    };

    const togglePlay = (tokenId: string) => {
        const videoElement = videoRefs.current[tokenId];
        if (videoElement) {
            if (playingVideos[tokenId]) {
                videoElement.pause();
                setPlayingVideos(prev => ({ ...prev, [tokenId]: false }));
            } else {
                videoElement.play()
                    .then(() => {
                        setPlayingVideos(prev => ({ ...prev, [tokenId]: true }));
                    })
                    .catch(err => console.error("Error playing video:", err));
            }
        }
    };

    const toggleDescription = (tokenId: string) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [tokenId]: !prev[tokenId]
        }));
    };

    // Show loading state while data is being fetched
    if (isLoadingData) {
        return (
            <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-900">
                <div className="text-white">Loading token data...</div>
            </div>
        );
    }

    return (
        <main className="min-h-[100dvh] flex flex-col bg-slate-900 relative max-w-md mx-auto">
            {/* Background element */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90 z-0"></div>

            {/* Header */}
            <header className="z-10 border-b border-slate-100/20 backdrop-blur-md">
                <div className="px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">Clank.Insta</h1>

                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                {/* <button
                                    onClick={() => setShowWalletMenu(!showWalletMenu)}
                                    className="flex items-center border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md px-3 py-1"
                                >
                                    <Wallet className="h-4 w-4 mr-2 text-white" />
                                    <span className="text-white text-sm">{balance} ETH</span>
                                </button> */}

                                {/* Wallet dropdown menu */}
                                {/* {showWalletMenu && (
                                    <div
                                        ref={walletMenuRef}
                                        className="fixed right-4 top-14 w-52 border-2 border-slate-100/20 bg-slate-900/90 backdrop-blur-md rounded-lg p-2 z-50 shadow-lg"
                                    >
                                        <div className="border-b border-slate-700 pb-2 mb-2">
                                            <p className="text-xs text-slate-400 mb-1">Wallet Address</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-sm">{truncateAddress(walletAddress ?? '')}</span>
                                                <button
                                                    onClick={() => walletAddress && copyToClipboard(walletAddress)}
                                                    className="text-xs text-slate-400 hover:text-white"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <button
                                                onClick={() => walletAddress && fundWallet(walletAddress)}
                                                className="flex items-center w-full text-left text-white text-sm py-2 px-2 rounded hover:bg-slate-800"
                                            >
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Add Money
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setShowWalletMenu(false);
                                                    void handleLogout();

                                                }}
                                                className="flex items-center w-full text-left text-white text-sm py-2 px-2 rounded hover:bg-slate-800"
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Reels feed */}
            <div className="h-[calc(100dvh-60px)] w-full overflow-y-scroll snap-y snap-mandatory">
                {tokens.map((token) => (
                    <div
                        key={token.id}
                        id={`video-${token.id}`}
                        className="h-[calc(100dvh-60px)] w-full snap-start relative"
                    >
                        {/* Video */}
                        <div className="relative h-full w-full">
                            <video
                                ref={el => {
                                    videoRefs.current[token.id] = el;
                                }}
                                src={token.videoUrl}
                                className="h-full w-full object-cover"
                                loop
                                muted={isMuted}
                                playsInline
                            />

                            {/* Video overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                            {/* Side buttons */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-3">
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="border-2 border-slate-600 bg-black/30 backdrop-blur-sm text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <button
                                    onClick={() => togglePlay(token.id)}
                                    className="border-2 border-slate-600 bg-black/30 backdrop-blur-sm text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                                >
                                    {playingVideos[token.id] ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                            </div>

                            {/* Token info card - more compact */}
                            <div className="absolute bottom-4 left-4 right-4 border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                                <div className="flex items-center mb-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-slate-600 mr-2">
                                        <Image
                                            src={token.creatorAvatar || '/avatar-placeholder.png'}
                                            alt={token.creatorName}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{token.name}</h3>
                                        <p className="text-slate-400 text-xs">{token.creatorHandle}</p>
                                    </div>
                                    <div className="ml-auto flex items-center">
                                        <div className="ml-auto flex items-center">
                                            {/* <a href={`https://dexscreener.com/base/${token.address}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-xs mr-2 text-slate-400 hover:text-white">
                                                <span>DEX</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a> */}
                                            <div className="text-xs mr-2">
                                                <span className="text-slate-400">Holders: </span>
                                                <span className="text-white font-medium">{token.holders}</span>
                                            </div>
                                            <div className={`text-xs font-medium px-2 py-1 rounded ${token.change >= 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                                {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Toggleable description */}
                                <div className="mb-2">
                                    <button
                                        onClick={() => toggleDescription(token.id)}
                                        className="flex items-center justify-between w-full text-xs text-slate-400 mb-1"
                                    >
                                        <span>Read More</span>
                                        {expandedDescriptions[token.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>

                                    {expandedDescriptions[token.id] && (
                                        <p className="text-slate-400 text-xs">{token.description}</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleBuy(token.address)}
                                    className="border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10"
                                >
                                    <span className="flex items-center justify-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        Collect on Uniswap
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Buy modal */}
            {showBuyModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="border-2 border-slate-100/20 bg-slate-900/90 backdrop-blur-md rounded-lg max-w-xs w-full p-4">
                        <h3 className="text-lg font-bold mb-4 text-white">
                            Buy {tokens.find(t => t.id === showBuyModal)?.name}
                        </h3>

                        <div className="mb-4">
                            <p className="text-sm text-slate-400 mb-1">Amount to buy</p>
                            <div className="flex border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md overflow-hidden">
                                <input
                                    type="number"
                                    className="bg-transparent text-white px-3 py-2 flex-1 outline-none"
                                    placeholder="0.00"
                                />
                                <div className="flex items-center justify-center px-3 border-l-2 border-slate-600 bg-black/30">
                                    <span className="text-white text-sm">ETH</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Price</span>
                                <span className="text-white">{tokens.find(t => t.id === showBuyModal)?.price.toFixed(6)} ETH</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Price (USD)</span>
                                <span className="text-white">${tokens.find(t => t.id === showBuyModal)?.priceUsd}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Transaction fee</span>
                                <span className="text-white">0.001 ETH</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-slate-400">Total</span>
                                <span className="text-white">{(tokens.find(t => t.id === showBuyModal)?.price ?? 0) + 0.001} ETH</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowBuyModal(null)}
                                className="border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                className="border-2 py-2 rounded-md bg-white/10 border-slate-400 backdrop-blur-sm text-white hover:border-white w-full hover:bg-white/20"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default TradeReelsFeed;