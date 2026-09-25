'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { usePlan } from '@/context/PlanContext';

const MyPlanContent = () => {
    const {
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        removeFromSaved,
        toggleCompleted,
        isCompleted,
        isLoaded,
    } = usePlan();

    const searchParams = useSearchParams();
    const tabQuery = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState("Today's Plan");
    const [sortBy, setSortBy] = useState('Duration');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Sync tab with URL query parameter (e.g. from Nav clicks)
    useEffect(() => {
        if (tabQuery === 'saved') {
            setActiveTab('Saved');
        } else if (tabQuery === 'plan') {
            setActiveTab("Today's Plan");
        }
    }, [tabQuery]);

    const sortOptions = ['Duration', 'Calories', 'Rating'];

    // Calculate metrics based on the currently active tab (Today's Plan or Saved)
    const currentList = activeTab === "Today's Plan" ? plan : saved;

    const exercises = isLoaded ? currentList.length : 0;
    const minutes = isLoaded
        ? currentList.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0)
        : 0;
    const calories = isLoaded
        ? currentList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0)
        : 0;

    // Filter and sort workouts for current tab
    const displayedWorkouts = useMemo(() => {
        if (!isLoaded) return [];
        const listCopy = [...currentList];

        return listCopy.sort((a, b) => {
            if (sortBy === 'Duration') {
                return (Number(b.duration) || 0) - (Number(a.duration) || 0);
            }
            if (sortBy === 'Calories') {
                return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
            }
            if (sortBy === 'Rating') {
                return (Number(b.rating) || 0) - (Number(a.rating) || 0);
            }
            return 0;
        });
    }, [isLoaded, currentList, sortBy]);

    return (
        <div className="min-h-[calc(100vh-68px)] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    MY PLAN
                </h1>
                <p className="mt-1 text-sm text-neutral-400 font-normal">
                    {activeTab === "Today's Plan"
                        ? 'Cap of five lifts for today. Finish them, then load more.'
                        : 'Your saved library of workouts for later sessions.'}
                </p>
            </div>

            {/* Metrics / Stats Card (Reflects current tab's workouts) */}
            <div className="mt-6 bg-[#12141c] border border-[#232733]/80 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#232733]/80">
                    {/* Exercises */}
                    <div className="sm:pr-8">
                        <span className="text-xs sm:text-sm font-medium text-neutral-400 block mb-2">
                            Exercises
                        </span>
                        <span className="text-4xl sm:text-5xl font-black text-[#c6ff00] tracking-tight">
                            {exercises}
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="pt-4 sm:pt-0 sm:px-8">
                        <span className="text-xs sm:text-sm font-medium text-neutral-400 block mb-2">
                            Minutes
                        </span>
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                            {minutes}
                        </span>
                    </div>

                    {/* Calories */}
                    <div className="pt-4 sm:pt-0 sm:pl-8">
                        <span className="text-xs sm:text-sm font-medium text-neutral-400 block mb-2">
                            Calories
                        </span>
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                            {calories}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls Bar: Tabs & Sort Dropdown */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="inline-flex bg-[#12141c] border border-[#232733]/80 rounded-xl p-1 w-fit shadow-sm">
                    <button
                        type="button"
                        onClick={() => setActiveTab("Today's Plan")}
                        className={`px-5 py-2 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer ${activeTab === "Today's Plan"
                                ? 'bg-[#1e2330] text-white font-semibold shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Today&apos;s Plan ({isLoaded ? plan.length : 0})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('Saved')}
                        className={`px-5 py-2 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer ${activeTab === 'Saved'
                                ? 'bg-[#1e2330] text-white font-semibold shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Saved ({isLoaded ? saved.length : 0})
                    </button>
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-sm text-neutral-400 font-medium">Sort By</span>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="bg-[#12141c] hover:bg-[#181a24] border border-[#232733]/80 rounded-xl px-4 py-2 text-sm text-white font-medium flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                        >
                            <span>{sortBy}</span>
                            <svg
                                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isSortOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-[#161822] border border-[#232733] rounded-xl shadow-2xl py-1 z-20">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            setSortBy(option);
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${sortBy === option
                                                ? 'bg-[#1e2330] text-[#c6ff00]'
                                                : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Workouts List or Empty State */}
            {displayedWorkouts.length === 0 ? (
                <div className="mt-6 border border-dashed border-[#232733] rounded-3xl p-10 sm:p-16 flex flex-col items-center justify-center text-center bg-[#0d0f14]/40 min-h-[320px] sm:min-h-[380px]">
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        NOTHING HERE YET
                    </h2>
                    <p className="mt-2 text-sm text-neutral-400 max-w-sm font-normal">
                        {activeTab === "Today's Plan"
                            ? 'Browse the library and add a lift to get today moving.'
                            : 'You have not saved any workouts for later yet.'}
                    </p>
                    <Link
                        href="/workouts"
                        className="mt-6 bg-[#c6ff00] hover:bg-[#bbf000] text-black font-extrabold text-sm px-7 py-3 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#c6ff00]/15 cursor-pointer"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {displayedWorkouts.map((item) => {
                        const workoutId = item.id || item._id;
                        const done = isCompleted(workoutId);

                        return (
                            <div
                                key={workoutId}
                                className={`bg-[#12141c] border border-[#232733]/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl transition-all duration-300 hover:border-zinc-700/80 ${done ? 'opacity-85' : ''
                                    }`}
                            >
                                {/* Left side: Thumbnail + Info */}
                                <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                                    <div className="relative w-28 sm:w-36 aspect-[16/10] shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-[#232733]">
                                        <img
                                            src={item.image || '/img/barbell-bench-press.jpg'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 truncate">
                                            {item.equipment}
                                        </p>
                                        {/* Meta Stats */}
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-neutral-300 font-medium">
                                            {/* Duration */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    className="w-4 h-4 text-[#c6ff00] stroke-current shrink-0"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    strokeWidth="2"
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                                <span>{item.duration} min</span>
                                            </div>

                                            {/* Calories */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    className="w-4 h-4 text-amber-400 fill-current shrink-0"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12.5 2c0 2.5-1.5 4.5-3 6.5C8 10.5 7 12.5 7 15a5 5 0 0 0 10 0c0-3.5-2-6-4.5-9.5z" />
                                                </svg>
                                                <span>{item.caloriesBurned} kcal</span>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    className="w-4 h-4 text-[#c6ff00] stroke-current shrink-0"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    strokeWidth="2"
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                                <span>{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side: Actions */}
                                <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                                    {/* View Details Link */}
                                    <Link
                                        href={`/workouts/${workoutId}`}
                                        className="bg-[#12141c] hover:bg-[#1a1d28] border border-[#232733] text-neutral-300 hover:text-white px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                                    >
                                        View Details
                                    </Link>

                                    {/* Action button: Mark as Done (Only in Today's Plan) */}
                                    {activeTab === "Today's Plan" && (
                                        <button
                                            type="button"
                                            onClick={() => toggleCompleted(workoutId)}
                                            className={`px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer ${done
                                                    ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                                                    : 'bg-[#c6ff00] hover:bg-[#b5ea00] text-black shadow-[#c6ff00]/10'
                                                }`}
                                        >
                                            <svg
                                                className="w-4 h-4 stroke-current shrink-0"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>{done ? 'Completed' : 'Mark as Done'}</span>
                                        </button>
                                    )}

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            activeTab === "Today's Plan"
                                                ? removeFromPlan(workoutId)
                                                : removeFromSaved(workoutId)
                                        }
                                        title={activeTab === "Today's Plan" ? "Remove from plan" : "Remove from saved"}
                                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-[calc(100vh-68px)] flex items-center justify-center text-neutral-400">Loading plan...</div>}>
            <MyPlanContent />
        </Suspense>
    );
}
