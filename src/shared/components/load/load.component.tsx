import {LoadProps} from "@/shared/components/load/load.props";

export default function LoadComponent({ className, message }: LoadProps) {
    return (
        <div className={`grid place-items-center min-h-screen ${className ?? ""}`}>
            <div className="flex flex-col items-center gap-4">

                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

                <p className="text-sm text-muted-foreground">
                    {message ?? "Loading..."}
                </p>

            </div>
        </div>
    );
}