/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import { useState } from "react";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { PlusCircle, Wallet, LogOut, CreditCard, ArrowRight, TrendingUp, Users, DollarSign, RefreshCcw } from "lucide-react";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { publicClient } from "~/utils/client";
import { formatEther } from "viem";
import { useWalletBalance } from "~/utils/walletbalance";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { ready, authenticated, user, logout } = usePrivy();
    const { client } = useSmartWallets();
    const [showAddFunds, setShowAddFunds] = useState(false);
    const walletAddress = user?.smartWallet?.address;
    const { fundWallet } = useFundWallet();
    const router = useRouter();

    const { balance, isLoading, error, refreshBalance } = useWalletBalance(walletAddress);


    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    // Sample data - would come from your API
    const [coins, setCoins] = useState([
        {
            id: '1',
            name: 'CreatorCoin',
            description: 'My exclusive creator coin for my top supporters',
            videoUrl: 'https://example.com/video1',
            price: 0.025,
            holders: 156,
            feesAccumulated: 2.45
        },
        {
            id: '2',
            name: 'MusicToken',
            description: 'Access to exclusive music content and community',
            videoUrl: 'https://example.com/video2',
            price: 0.018,
            holders: 89,
            feesAccumulated: 1.12
        }
    ]);

    const [wallet, setWallet] = useState({
        address: '0x1a2...7d8e',
        balance: 3.45
    });

    const handleWithdrawFees = (coinId: string) => {
        // Logic to withdraw fees
        console.log(`Withdrawing fees for coin ${coinId}`);
    };

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
                            {/* <div className="flex items-center border-2 border-slate-600 bg-black/20 backdrop-blur-sm rounded-md px-3 py-1">
                                <Wallet className="h-4 w-4 mr-2 text-white" />
                                <span className="text-white text-sm">{wallet.balance} ETH</span>
                            </div> */}
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
                                        src="/api/placeholder/64/64"
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold text-white">{String(user?.instagram?.username) ?? 'Creator Name'}</h2>
                                <span className="flex">
                                    <p className="text-slate-400 text-sm"> {balance} ETH</p>
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
                                <p className="text-white font-bold">{wallet.balance} ETH</p>
                            </div>
                        </div>
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                            <div className="flex flex-col items-center">
                                <Users className="h-5 w-5 text-white mb-1" />
                                <p className="text-xs text-slate-400">Holders</p>
                                <p className="text-white font-bold">{coins.reduce((acc, coin) => acc + coin.holders, 0)}</p>
                            </div>
                        </div>
                        <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-3">
                            <div className="flex flex-col items-center">
                                <DollarSign className="h-5 w-5 text-white mb-1" />
                                <p className="text-xs text-slate-400">Fees</p>
                                <p className="text-white font-bold">{coins.reduce((acc, coin) => acc + coin.feesAccumulated, 0).toFixed(1)}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Coins */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Your Tokens</h3>
                        <button className="border-2 py-1 px-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 text-xs hover:bg-white/10">
                            <span className="flex items-center">
                                <PlusCircle className="h-4 w-4 mr-1" />
                                New Token
                            </span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {coins.map((coin) => (
                            <div key={coin.id} className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="text-white font-bold">{coin.name}</h4>
                                            <p className="text-slate-400 text-sm">{coin.description}</p>
                                        </div>
                                        <div>
                                            <span className="inline-block border border-slate-600 bg-black/30 text-white text-xs px-2 py-1 rounded-md">
                                                {coin.price} ETH
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <div>
                                            <p className="text-slate-400 text-xs">Holders</p>
                                            <p className="text-white text-sm">{coin.holders}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs">Fees</p>
                                            <p className="text-white text-sm">{coin.feesAccumulated} ETH</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => handleWithdrawFees(coin.id)}
                                            className="border-2 py-1 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10 text-xs"
                                        >
                                            Withdraw Fees
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {coins.length === 0 && (
                            <div className="border-2 border-slate-100/20 bg-slate-900/70 backdrop-blur-md rounded-lg p-6 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="border-2 border-slate-600 bg-black/20 p-3 rounded-full">
                                        <PlusCircle className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h4 className="text-white font-bold mb-2">No Tokens Yet</h4>
                                <p className="text-slate-400 text-sm mb-4">Create your first token from your Instagram reels</p>
                                <button className="border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10">
                                    Create New Token
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="mt-auto border-t border-slate-100/20 backdrop-blur-md py-4 z-10">
                <div className="px-4">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-white mb-1">Clank.Insta</h2>
                        <p className="text-slate-400 text-xs mb-3">Turn Instagram reels into tokens</p>
                        {/* <div className="flex justify-center space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white text-xs">Terms</a>
                            <a href="#" className="text-slate-400 hover:text-white text-xs">Privacy</a>
                            <a href="#" className="text-slate-400 hover:text-white text-xs">Support</a>
                        </div> */}
                        <p className="mt-3 text-xs text-slate-500">© 2025 Clank.Insta. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}