"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import LoginButton from './login-button';
import { useLogin } from '@privy-io/react-auth';

const HomepageCta = () => {
    const router = useRouter();

    const { login } = useLogin({
        onComplete: () => router.push("/creator"),
    });
    return (
        <div className='flex space-x-2 items-center'>
            <LoginButton onClick={login} />
        </div>
    )
}

export default HomepageCta