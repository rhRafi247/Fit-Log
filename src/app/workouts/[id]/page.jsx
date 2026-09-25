import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import WorkoutActionButtons from '@/component/WorkoutActionButtons';

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (res.ok) {
            const list = await res.json();
            if (Array.isArray(list)) {
                return list.map((item) => ({ id: String(item.id) }));
            }
        }
    } catch (e) {
        console.error('generateStaticParams error:', e);
    }
    return [];
}

const getData = async (id) => {
    if (!id || id === 'undefined') return null;

    try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
            next: { revalidate: 60 },
        });

        if (res.ok) {
            const data = await res.json();
            if (data && data.name) return data;
        }
    } catch (error) {
        console.error('Error fetching workout data:', error);
    }

    // Fallback: fetch full list and match item by id
    try {
        const listRes = await fetch('https://api.abcz.workers.dev/api/fitlog', {
            next: { revalidate: 60 },
        });
        if (listRes.ok) {
            const list = await listRes.json();
            if (Array.isArray(list)) {
                const matched = list.find((item) => String(item.id) === String(id));
                if (matched) return matched;
            }
        }
    } catch (fallbackError) {
        console.error('Fallback list fetch error:', fallbackError);
    }

    return null;
};

const Page = async ({ params }) => {
    const { id } = await params;
    const item = await getData(id);

    if (!item) {
        notFound();
    }

    const {
        name,
        image,
        muscleGroups = [],
        equipment,
        difficulty,
        sets,
        reps,
        duration,
        caloriesBurned,
        rating,
        description,
        instructions = [],
    } = item;

    const specs = [
        { label: 'EQUIPMENT', value: equipment },
        { label: 'DIFFICULTY', value: difficulty },
        { label: 'SETS', value: sets },
        { label: 'REPS', value: reps },
        { label: 'DURATION', value: duration ? `${duration} min` : null },
        { label: 'CALORIES', value: caloriesBurned ? `${caloriesBurned} kcal` : null },
        { label: 'RATING', value: rating },
    ];

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6 flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14 items-center w-full">
                {/* Left Column: Image (Fitted to viewport height) */}
                <div className="flex items-center justify-center w-full">
                    <div className="relative w-full max-w-[460px] aspect-[4/5] max-h-[72vh] rounded-3xl overflow-hidden border border-[#232733]/80 bg-[#16181f] shadow-2xl">
                        <img
                            src={image || '/img/barbell-bench-press.jpg'}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Column: Workout Details */}
                <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0 w-full">
                    {/* Workout Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08]">
                        {name}
                    </h1>

                    {/* Workout Description */}
                    {description && (
                        <p className="mt-2 text-neutral-400 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                            {description}
                        </p>
                    )}

                    {/* Muscle Group Badges */}
                    {muscleGroups.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                            {muscleGroups.map((group, index) => (
                                <span
                                    key={index}
                                    className="bg-[#c6ff00] text-black font-extrabold text-[11px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-wider select-none"
                                >
                                    {group}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Specifications List / Card */}
                    <div className="mt-4 bg-[#12141a] border border-[#232733]/80 rounded-2xl overflow-hidden divide-y divide-[#232733]/60 shadow-lg">
                        {specs.map(
                            (spec, index) =>
                                spec.value !== null &&
                                spec.value !== undefined && (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between px-5 py-2 text-xs transition-colors hover:bg-neutral-800/20"
                                    >
                                        <span className="font-bold text-neutral-400 tracking-wider uppercase">
                                            {spec.label}
                                        </span>
                                        <span className="font-semibold text-white">
                                            {spec.value}
                                        </span>
                                    </div>
                                )
                        )}
                    </div>

                    {/* Instructions Section */}
                    {instructions.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-2">
                                INSTRUCTIONS
                            </h2>
                            <ol className="space-y-1 sm:space-y-1.5">
                                {instructions.map((step, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-[13px] leading-snug"
                                    >
                                        <span className="text-neutral-500 font-semibold shrink-0">
                                            {index + 1}.
                                        </span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <WorkoutActionButtons item={item} />
                </div>
            </div>
        </div>
    );
};

export default Page;