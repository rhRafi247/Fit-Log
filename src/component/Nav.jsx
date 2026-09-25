import Link from 'next/link';
import React from 'react';


function Nav() {
    const navItem = <>
        <li><Link href={'/workouts'}>Workouts</Link></li>
        <li><Link href={'/my-plan'}>My Plan</Link></li>
    </>
    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItem}
                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">
                        <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
                        <h2>FITLOG</h2>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
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