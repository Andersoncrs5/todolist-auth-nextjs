import {LoadFormProps} from "@/shared/components/loadForm/load-from.props";

export default function LoadFormComponent({ className = "" }: LoadFormProps) {
    return (
        <div className={`grid place-items-center min-h-screen ${className}`}>
            <div className="w-full max-w-md p-8 rounded-2xl border space-y-6 animate-pulse">

                <div className="h-6 w-2/3 rounded bg-gray-200" />

                <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                    <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>

                <div className="h-10 w-28 rounded bg-gray-200" />

            </div>
        </div>
    )
}