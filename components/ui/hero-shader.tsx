'use client';

import type React from "react";

interface HeroShaderBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * HeroShaderBackground - Simple CSS gradient background (performance optimized)
 * Replaced GPU shaders with CSS for smooth scrolling
 */
export function HeroShaderBackground({ children, className = "" }: HeroShaderBackgroundProps) {
    return (
        <div className={`min-h-screen w-full relative overflow-hidden ${className}`}>
            {/* Base cream background with CSS gradient - NO GPU shaders */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 30% 20%, rgba(245, 198, 106, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(232, 184, 74, 0.25) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(255, 219, 142, 0.2) 0%, transparent 60%),
                        linear-gradient(135deg, #fdfcfb 0%, #faf8f5 50%, #f5f0e8 100%)
                    `
                }}
            />

            {/* Light cream overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/40 via-[#faf8f5]/50 to-[#faf8f5]/70 pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}

export default HeroShaderBackground;
