
export default function MainLoading() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="h-16 border-b border-white/5 bg-zinc-900/50 animate-pulse" />

            <main className="max-w-7xl mx-auto p-6 space-y-4">
                <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-8" />

                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-24 w-full bg-zinc-900/50 border border-white/5 rounded-lg animate-pulse" />
                ))}
            </main>
        </div>
    );
}