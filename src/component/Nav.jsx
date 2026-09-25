'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Nav() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Workouts', href: '/workouts' },
        { name: 'My Plan', href: '/my-plan' },
    ];

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname === href || pathname?.startsWith(href + '/');
    };

    return (
        <div>
            <div className="navbar bg-base-100 border-b border-[#232733]/60 shadow-sm px-4 sm:px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-[#16181f] border border-[#232733] rounded-2xl z-50 mt-3 w-52 p-3 shadow-2xl space-y-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                                                active
                                                    ? '!bg-[#242b16] !text-[#c6ff00]'
                                                    : '!text-neutral-400 hover:!text-white hover:!bg-neutral-800/40'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">
                        <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
                        <h2>FITLOG</h2>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            active
                                                ? 'bg-[#242b16] text-[#c6ff00]'
                                                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                    <p>Plan <span>0</span></p>
                    <p>Saved <span>0</span></p>
                </div>
            </div>
        </div>
    );
}

export default Nav;