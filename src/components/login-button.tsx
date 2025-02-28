'use client';

export default function LoginButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
            onClick={onClick}
        >
            Log in
        </button>
    );
}