'use client';

import type React from "react";
import { useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface HeroShaderBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * HeroShaderBackground - Animated mesh gradient background with honey-amber theme
 * Uses @paper-design/shaders-react for smooth GPU-accelerated animations
 */
export function HeroShaderBackground({ children, className = "" }: HeroShaderBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={`min-h-screen w-full relative overflow-hidden ${className}`}>
            {/* Base cream background */}
            <div className="absolute inset-0 bg-[#faf8f5]"></div>

            {/* SVG Filters for glassmorphism effects */}
            <svg className="absolute inset-0 w-0 h-0">
                <defs>
                    <filter id="glass-effect-honey" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence baseFrequency="0.005" numOctaves={1} result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale={0.3} />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0.05
                                    0 1 0 0 0.03
                                    0 0 1 0 0
                                    0 0 0 0.9 0"
                            result="tint"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Primary Mesh Gradient - Lighter Honey/Amber Theme */}
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-60"
                colors={[
                    "#faf8f5",    // cream (bg)
                    "#F5C66A",    // lighter honey
                    "#faf8f5",    // cream
                    "#FFDB8E",    // very light amber
                    "#E8B84A"     // medium honey
                ]}
                speed={0.12}
            />

            {/* Secondary Mesh - Very subtle golden overlay */}
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-25"
                colors={[
                    "#faf8f5",
                    "#F5D78E",    // light gold
                    "#FFE4A8",    // very light gold
                    "#faf8f5"
                ]}
                speed={0.08}
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
