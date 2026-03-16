import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-zinc-400 animate-pulse font-medium tracking-widest uppercase text-xs">
                    Loading Application...
                </p>
            </div>
        </div>
    );
}