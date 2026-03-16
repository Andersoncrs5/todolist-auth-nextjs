'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('ErrorBoundary caught:', error)
    }, [error])

    return (
        <div className="flex min-h-100 flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-white">Something went wrong!</h2>
            <p className="mb-8 text-zinc-400 max-w-md">
                An unexpected error occurred in this section. Our team has been notified.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => window.location.href = '/main'}
                    className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
                >
                    Go to Dashboard
                </button>

                <button
                    onClick={() => reset()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                </button>
            </div>
        </div>
    )
}