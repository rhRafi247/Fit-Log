import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 max-w-3xl mx-auto my-auto w-full">
            {/* Athletic 404 Visual */}
            <div className="relative mb-6">
                <span className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-[#1b1f2b] select-none">
                    404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#242b16] border border-[#c6ff00]/40 text-[#c6ff00] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(198,255,0,0.2)]">
                        ROUTE NOT FOUND
                    </div>
                </div>
            </div>

            {/* Heading and Message */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                LOST YOUR FORM?
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed">
                The workout, route, or page you are looking for doesn&apos;t exist, has been moved, or is taking a rest day.
            </p>

            {/* Quick Action Navigation */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                    href="/"
                    className="bg-[#c6ff00] hover:bg-[#b5ea00] text-black font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg shadow-[#c6ff00]/20 flex items-center gap-2 cursor-pointer"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Back to Home</span>
                </Link>

                <Link
                    href="/workouts"
                    className="bg-[#16181f] hover:bg-[#20232d] text-white border border-[#232733] font-bold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                    <svg
                        className="w-4 h-4 text-[#c6ff00]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Browse Workouts</span>
                </Link>

                <Link
                    href="/my-plan"
                    className="bg-transparent hover:bg-neutral-800/40 text-neutral-300 hover:text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
                >
                    My Plan
                </Link>
            </div>
        </div>
    );
}
