"use client";

import {ReactNode, useEffect} from "react";

export interface ModalProps {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* modal */}
            <div className="relative bg-zinc-900 border rounded-xl w-full max-w-md p-6 z-10">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div>
                    {children}
                </div>

            </div>

        </div>
    );
}