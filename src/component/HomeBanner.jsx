import React from 'react';
import Link from 'next/link';

const HomeBanner = ({ onBrowseClick }) => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="relative w-full bg-[#12141a] border border-[#232733]/60 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
                
                {/* Left Content */}
                <div className="max-w-xl z-10 flex flex-col items-start space-y-6">
                    {/* Neon green badge */}
                    <div className="text-[#c6ff00] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase font-mono">
                        WORKOUT LIBRARY
                    </div>

                    {/* Main headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
                        TRAIN WITH INTENT. LOG <br className="hidden sm:inline" />
                        EVERY SET.
                    </h1>

                    {/* Description text */}
                    <p className="text-neutral-400 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-lg">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    {/* Browse Workouts button */}
                    <Link 
                        href="/workouts"
                        onClick={onBrowseClick}
                        className="mt-2 bg-[#ccff00] hover:bg-[#bbf000] text-black font-extrabold px-7 py-3.5 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-[#ccff00]/15 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                    >
                        BROWSE WORKOUTS
                    </Link>
                </div>

                {/* Right Image */}
                <div className="relative w-full lg:w-auto flex items-center justify-center lg:justify-end">
                    <img 
                        src="/img/banner.png" 
                        alt="Workout Exercise Illustration" 
                        className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10"
                    />
                </div>

            </div>
        </section>
    );
};

export default HomeBanner;
