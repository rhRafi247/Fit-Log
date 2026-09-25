import Card from '@/component/Card';
import React from 'react';

const getData = async () => {
    try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch workouts: ${res.status}`);
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return [];
    }
};

const Page = async () => {
    const data = await getData();
    return (
        <div className="min-h-screen pb-16">
            <div>
                <div className="flex flex-col items-center mt-5 bg-[#12141a] py-10 px-4 text-center">
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">THE LIBRARY</h1>
                    <p className="mt-2 text-neutral-400">Twelve lifts covering every major muscle group.</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {data.map((item) => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
