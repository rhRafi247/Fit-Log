import React from 'react';

export default function Loading() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
            <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c6ff00] border-r-[#c6ff00]/60 animate-spin" />
                {/* Inner pulse */}
                <div className="absolute inset-2.5 rounded-full border border-[#c6ff00]/40 animate-ping opacity-60" />
                {/* Center Dumbbell Icon */}
                <svg
                    className="w-7 h-7 text-[#c6ff00] animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12"
                    />
                </svg>
            </div>
            <p className="text-sm font-black text-white tracking-widest uppercase animate-pulse">
                LOADING FITLOG...
            </p>
            <p className="text-xs text-neutral-400 mt-1">
                Getting workout data ready
            </p>
        </div>
    );
}
