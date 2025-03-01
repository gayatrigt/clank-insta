/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import { useState, useEffect } from "react";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { PlusCircle, Wallet, LogOut, CreditCard, ArrowRight, TrendingUp, Users, DollarSign, RefreshCcw, X, Loader2 } from "lucide-react";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { formatEther } from "viem";
import { useWalletBalance } from "~/utils/walletbalance";
import { useRouter } from "next/navigation";
import { useUserTokens } from "~/utils/hooks/useUserToken";

export default function DashboardPage() {
    const { ready, authenticated, user, logout } = usePrivy();
    const { client } = useSmartWallets();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTokenUrl, setNewTokenUrl] = useState('');
    const [newTokenName, setNewTokenName] = useState('');
    const [isCreatingToken, setIsCreatingToken] = useState(false);
    const [createTokenError, setCreateTokenError] = useState<string | null>(null);
    const walletAddress = user?.smartWallet?.address;
    const { fundWallet } = useFundWallet();
    const router = useRouter();
    const instagramUsername = 'sachintendulkar';

    // Use our custom hook to fetch tokens for the logged-in user
    const { tokens, isLoading: isLoadingTokens, error, refetch } = useUserTokens(instagramUsername);

    console.log(tokens);

    // Wallet balance hook
    const { balance, isLoading, refreshBalance } = useWalletBalance(walletAddress);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };
    // Calculate total market cap (FDV USD)
    const totalMarketCap = tokens.reduce((total, token) => {
        return total + (Number(token.marketCapUsd) || 0);
    }, 0);

    // Calculate total holders
    const totalHolders = tokens.reduce((total, token) => {
        return total + token.holders;
    }, 0);

    // If not authenticated, redirect or show login prompt
    if (!authenticated && ready) {
        router.push('/login');
        return null;
    }

    return (
        <main className="min-h-[100dvh] flex flex-col bg-slate-900 relative max-w-md mx-auto">
            {/* Background video */}
            <video
                className="w-full h-full object-cover absolute top-0 left-0 bg-white/10 blur-sm opacity-30"
                loop
                muted
                autoPlay
                playsInline
                src="https://cdn.openai.com/ctf-cdn/paper-planes.mp4"
            />

            {/* Header */}
            <header className="z-10 border-b border-slate-100/20 backdrop-blur-md">
                <div className="px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">Clank.Insta</h1>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleLogout}
                                className="border-2 border-slate-600 bg-black/20 backdrop-blur-sm text-white rounded-md p-2 hover:border-slate-500 hover:bg-white/10"
                                aria-label="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto z-10 p-4">
                {/* User Profile */}
                <section className="mb-6">
                    <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-slate-600">
                                    <Image
                                        src={tokens[0]?.displayPicture ?? "/api/placeholder/64/64"}
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold text-white">{instagramUsername ?? 'Creator Name'}</h2>
                                <span className="flex">
                                    <p className="text-slate-400 text-sm">{balance} ETH</p>
                                    <RefreshCcw className="h-3 w-3 text-slate-300 ml-2 mt-1 cursor-pointer" onClick={refreshBalance} />
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => walletAddress && fundWallet(walletAddress)}
                                className="border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10 text-sm"
                            >
                                <span className="flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 mr-1" />
                                    Add Money
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                            <div className="flex flex-col items-center">
                                <TrendingUp className="h-5 w-5 text-white mb-1" />
                                <p className="text-xs text-slate-400">Total Value</p>
                                <p className="text-white font-bold">
                                    ${totalMarketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                        </div>
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                            <div className="flex flex-col items-center">
                                <Users className="h-5 w-5 text-white mb-1" />
                                <p className="text-xs text-slate-400">Holders</p>
                                <p className="text-white font-bold">{totalHolders}</p>
                            </div>
                        </div>
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                            <div className="flex flex-col items-center">
                                <DollarSign className="h-5 w-5 text-white mb-1" />
                                <p className="text-xs text-slate-400">Fees</p>
                                <p className="text-white font-bold text-xs">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tokens */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Your Tokens</h3>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="border-2 py-1 px-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 text-xs hover:bg-white/10"
                        >
                            <span className="flex items-center">
                                <PlusCircle className="h-4 w-4 mr-1" />
                                New Token
                            </span>
                        </button>
                    </div>

                    {isLoadingTokens ? (
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-6 text-center">
                            <p className="text-white flex items-center justify-center">
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Loading tokens...
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tokens.map((token) => (
                                <div key={token.id} className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="text-white font-bold">{token.name}</h4>
                                                <p className="text-slate-400 text-sm">{token.description}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="inline-block border border-slate-600 bg-black/30 text-white text-xs px-2 py-1 rounded-md mr-2">
                                                    {token.price.toFixed(6)} ETH
                                                </span>
                                                <span className={`inline-block text-xs px-2 py-1 rounded-md ${parseFloat(token.changePercentage) >= 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                                    {parseFloat(token.changePercentage) >= 0 ? '+' : ''}{parseFloat(token.changePercentage).toFixed(2)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mb-4">
                                            <div>
                                                <p className="text-slate-400 text-xs">Holders</p>
                                                <p className="text-white text-sm">{token.holders}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-xs">Price (USD)</p>
                                                <p className="text-white text-sm">${parseFloat(token.priceUsd).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <a
                                                href={`https://dexscreener.com/base/${token.address}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="border-2 py-1 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10 text-xs text-center"
                                            >
                                                View on DEX
                                            </a>
                                            {token.videoUrl && (
                                                <a
                                                    href={token.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border-2 py-1 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10 text-xs text-center"
                                                >
                                                    View Reel
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {tokens.length === 0 && (
                                <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-6 text-center">
                                    <div className="mb-4 flex justify-center">
                                        <div className="border-2 border-slate-600 bg-black/20 p-3 rounded-full">
                                            <PlusCircle className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h4 className="text-white font-bold mb-2">No Tokens Yet</h4>
                                    <p className="text-slate-400 text-sm mb-4">Create your first token from your Instagram reels</p>
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10"
                                    >
                                        Create New Token
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>

            {/* Footer */}
            <footer className="mt-auto border-t border-slate-100/20 backdrop-blur-md py-4 z-10">
                <div className="px-4">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-white mb-1">Clank.Insta</h2>
                        <p className="text-slate-400 text-xs mb-3">Turn Instagram reels into tokens</p>
                        <p className="mt-3 text-xs text-slate-500">© 2025 Clank.Insta. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Create Token Modal */}
            {/* {showCreateTokenModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="border-2 border-slate-100/20 bg-slate-900/90 backdrop-blur-md rounded-lg max-w-md w-full p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">Create New Token</h3>
                            <button
                                onClick={() => setShowCreateTokenModal(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateToken}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">
                                    Token Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md p-2 text-white focus:outline-none focus:border-slate-500"
                                    placeholder="e.g., MyCoin"
                                    value={newToken.name}
                                    onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="w-full border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md p-2 text-white focus:outline-none focus:border-slate-500"
                                    placeholder="What is your token about?"
                                    rows={3}
                                    value={newToken.description}
                                    onChange={(e) => setNewToken({ ...newToken, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="instagramUrl" className="block text-sm font-medium text-slate-400 mb-1">
                                    Instagram Reel URL
                                </label>
                                <input
                                    type="url"
                                    id="instagramUrl"
                                    className="w-full border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md p-2 text-white focus:outline-none focus:border-slate-500"
                                    placeholder="https://www.instagram.com/reel/..."
                                    value={newToken.instagramUrl}
                                    onChange={(e) => setNewToken({ ...newToken, instagramUrl: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full border-2 py-2 rounded-md bg-white/10 border-slate-400 backdrop-blur-sm text-white hover:border-white hover:bg-white/20"
                                >
                                    Deploy Token
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </main>
    );
}