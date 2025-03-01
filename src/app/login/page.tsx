import HomepageCta from "~/components/homepage-cta";

export default function LoginPage() {
    return (
        <main className="flex min-h-[100dvh] flex-col items-center justify-end bg-slate-900 relative max-w-md mx-auto">
            <video
                className="w-full h-full object-cover absolute top-0 left-0 bg-white/10 blur-sm"
                loop
                muted
                autoPlay
                playsInline
                src="https://cdn.openai.com/ctf-cdn/paper-planes.mp4"
            />
            <div className="container p-2 z-10">
                <div className="text-white bg-slate-900/70 backdrop-blur-md border-2 border-slate-100/20 p-4 flex flex-col gap-2 pt-8 rounded-lg">
                    <h3 className="font-bold text-3xl">Clank.Insta</h3>
                    <p className="mb-2 text-base opacity-80 mt-2">
                        Turn your Instagram reels into coins and tokenize your creativity instantly.
                    </p>
                    <HomepageCta />
                </div>
            </div>
        </main>
    );
}