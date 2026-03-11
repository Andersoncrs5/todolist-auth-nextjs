"use client";

import { useState, useRef, useEffect } from "react";

export default function Dropdown({ children, label }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-48">

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 border rounded-lg bg-white/10 border-white/30 text-white flex justify-between"
            >
                {label}
                <span>▼</span>
            </button>

            {open && (
                <div className="absolute left-0 mt-2 p-2 w-full rounded-lg border shadow-lg z-50 space-y-2">
                    {children}
                </div>
            )}

        </div>
    );
}