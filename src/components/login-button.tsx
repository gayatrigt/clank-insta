export default function LoginButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className='border-2 py-2 rounded-md bg-black/20 border-slate-600 backdrop-blur-sm text-white hover:border-slate-500 w-full hover:bg-white/10'
            onClick={onClick}
        >
            Log in
        </button>
    );
}