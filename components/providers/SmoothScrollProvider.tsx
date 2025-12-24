'use client';

/**
 * SmoothScrollProvider - DISABLED for performance
 * Lenis was causing conflicts with WebGL canvas elements.
 * Using native CSS scroll-behavior: smooth instead.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    // Lenis disabled - native CSS smooth scrolling is more performant
    return <>{children}</>;
}

export default SmoothScrollProvider;

