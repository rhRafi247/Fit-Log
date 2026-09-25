import React from 'react';

const Card = ({
    image = "/img/barbell-bench-press.jpg",
    tags = ["CHEST", "ARMS"],
    title = "BARBELL BENCH PRESS",
    subtitle = "Barbell, Bench",
    duration = "25 min",
    calories = "180 kcal",
    rating = "4.8",
    className = "",
    onClick,
}) => {
    return (
        <div 
            onClick={onClick}
            className={`w-full max-w-sm bg-[#16181f] border border-[#232733]/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-2xl group ${className}`}
        >
            {/* Top Workout Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            {/* Card Content */}
            <div className="p-5">
                {/* Badges / Tags */}
                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag, index) => (
                        <span 
                            key={index}
                            className="bg-[#c6ff00] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full leading-none inline-flex items-center justify-center select-none"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Workout Title */}
                <h3 className="mt-4 text-xl font-black text-white uppercase tracking-tight leading-snug">
                    {title}
                </h3>

                {/* Equipment / Subtitle */}
                <p className="mt-1 text-sm text-neutral-400 font-normal">
                    {subtitle}
                </p>

                {/* Divider Line */}
                <div className="my-4 border-t border-[#232733]/80" />

                {/* Meta Information Footer */}
                <div className="flex items-center gap-5 text-neutral-400 text-sm font-medium">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5">
                        <svg 
                            className="w-4 h-4 stroke-current shrink-0" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{duration}</span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-1.5">
                        <svg 
                            className="w-4 h-4 fill-current shrink-0" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M12.5 2c0 2.5-1.5 4.5-3 6.5C8 10.5 7 12.5 7 15a5 5 0 0 0 10 0c0-3.5-2-6-4.5-9.5z" />
                        </svg>
                        <span>{calories}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <svg 
                            className="w-4 h-4 stroke-current shrink-0" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
