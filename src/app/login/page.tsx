'use client';

import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation"; // Note: using next/navigation instead of next/router
import LoginButton from "~/components/login-button";


export default function LoginPage() {
    const router = useRouter();
    const { login } = useLogin({
        onComplete: () => router.push("/dashboard"),
    });

    return (
        <main className="flex min-h-screen min-w-full">
            <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
                <div>
                    <div className="mt-6 flex justify-center text-center">
                        <LoginButton onClick={login} />
                    </div>
                </div>
            </div>
        </main>
    );
}