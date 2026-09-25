import React from 'react';

export default function ExerciseLoading() {
    return (
        <div className="w-[95%] mx-auto pb-12 animate-fade-in" role="status" aria-label="Loading exercises">
            {/* Visual Pulse Indicator */}
            <div className="flex flex-col items-center justify-center my-6 gap-3">
                <div className="relative flex items-center justify-center w-14 h-14">
                    {/* Outer Glowing Spinning Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c6ff00] border-r-[#c6ff00]/60 animate-spin" />
                    {/* Inner Pulse Ring */}
                    <div className="absolute inset-2 rounded-full border border-[#c6ff00]/30 animate-ping opacity-60" />
                    {/* Fitness Dumbbell Icon */}
                    <svg
                        className="w-6 h-6 text-[#c6ff00] animate-pulse"
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
                <div className="text-center">
                    <p className="text-xs uppercase font-extrabold tracking-widest text-[#c6ff00] animate-pulse">
                        FETCHING EXERCISES...
                    </p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                        Preparing your workout library
                    </p>
                </div>
            </div>

            {/* Skeleton Grid matching the 4 Card layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {[1, 2, 3, 4].map((id) => (
                    <div
                        key={id}
                        className="w-full max-w-sm bg-[#16181f]/90 border border-[#232733]/80 rounded-2xl overflow-hidden shadow-xl"
                    >
                        {/* Shimmer Image Placeholder */}
                        <div className="relative w-full aspect-[4/3] bg-[#1c1f2a] overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                        </div>

                        {/* Card Body Skeleton */}
                        <div className="p-5 space-y-4">
                            {/* Badges Placeholder */}
                            <div className="flex gap-2">
                                <div className="h-5 w-16 bg-[#252b1b] rounded-full animate-pulse" />
                                <div className="h-5 w-12 bg-[#252b1b] rounded-full animate-pulse" />
                            </div>

                            {/* Title Placeholder */}
                            <div className="h-6 w-3/4 bg-neutral-800 rounded-lg animate-pulse" />

                            {/* Subtitle Placeholder */}
                            <div className="h-4 w-1/2 bg-neutral-800/60 rounded-md animate-pulse" />

                            {/* Divider Line */}
                            <div className="border-t border-[#232733]/80 my-3" />

                            {/* Stats Row Placeholder */}
                            <div className="flex items-center justify-between pt-1">
                                <div className="h-4 w-16 bg-neutral-800/60 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-neutral-800/60 rounded animate-pulse" />
                                <div className="h-4 w-12 bg-neutral-800/60 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
