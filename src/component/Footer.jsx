import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#232733]/60 py-6 px-4 sm:px-6 lg:px-8 mt-auto bg-[#0d0f14]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <img src="/img/logo.png" alt="FitLog Logo" className="h-5 w-auto" />
                    <span className="font-black text-white text-sm tracking-wider uppercase">FITLOG</span>
                </Link>
                <p className="text-xs text-neutral-400 font-normal">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
