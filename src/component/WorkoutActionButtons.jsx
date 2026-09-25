'use client';

import React from 'react';
import { usePlan } from '@/context/PlanContext';

const WorkoutActionButtons = ({ item }) => {
    const { addToPlan, toggleSave, isInPlan, isSaved, isLoaded } = usePlan();

    if (!item) return null;

    const itemId = item.id !== undefined ? item.id : item._id;
    const inPlan = isLoaded && isInPlan(itemId);
    const saved = isLoaded && isSaved(itemId);

    const handlePlanClick = () => {
        addToPlan(item);
    };

    return (
        <div className="flex flex-wrap items-center gap-3.5 mt-5">
            {/* Add to today's plan button */}
            <button
                type="button"
                onClick={handlePlanClick}
                className={`text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md cursor-pointer font-extrabold ${
                    inPlan
                        ? 'bg-[#232a16] text-[#c6ff00] border border-[#c6ff00]/50'
                        : 'bg-[#c6ff00] hover:bg-[#b5ea00] text-black shadow-[#c6ff00]/10'
                }`}
            >
                <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                >
                    {inPlan ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                        <>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <line x1="12" y1="14" x2="12" y2="18" />
                            <line x1="10" y1="16" x2="14" y2="16" />
                        </>
                    )}
                </svg>
                <span>{inPlan ? "Added to today's plan ✓" : "Add to today's plan"}</span>
            </button>

            {/* Save for later button */}
            <button
                type="button"
                onClick={() => toggleSave(item)}
                className={`border text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer font-bold ${
                    saved
                        ? 'bg-[#1e2330] text-[#c6ff00] border-[#c6ff00]/50'
                        : 'bg-[#12141a] hover:bg-[#1a1d26] border-[#232733] text-white'
                }`}
            >
                <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
                    fill={saved ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
                <span>{saved ? 'Saved ✓' : 'Save for later'}</span>
            </button>
        </div>
    );
};

export default WorkoutActionButtons;
