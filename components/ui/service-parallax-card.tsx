"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceParallaxCardProps {
    title: string;
    description: string;
    price: string;
    category: string;
    icon?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const ServiceParallaxCard = React.forwardRef<
    HTMLDivElement,
    ServiceParallaxCardProps
>(
    (
        {
            title,
            description,
            price,
            category,
            icon,
            className,
            style,
            children,
        },
        ref
    ) => {
        // Motion values for 3D tilt effect
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
        const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

        const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
        const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

        // Parallax layers
        const translateZIcon = useTransform(ySpring, [-0.5, 0.5], [-30, 30]);
        const translateZContent = useTransform(ySpring, [-0.5, 0.5], [20, -20]);
        const translateZPrice = useTransform(ySpring, [-0.5, 0.5], [30, -30]);

        // Glow effect position
        const glowX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
        const glowY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / rect.width - 0.5;
            const yPct = mouseY / rect.height - 0.5;
            x.set(xPct);
            y.set(yPct);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    ...style
                }}
                className={cn(
                    "relative cursor-pointer perspective-1000",
                    className
                )}
            >
                <div
                    style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                    className="relative flex flex-col h-full rounded-2xl bg-white p-8 border border-primary/10 shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden group"
                >
                    {/* Animated Glow Effect */}
                    <motion.div
                        style={{ left: glowX, top: glowY }}
                        className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />

                    {/* Icon Container - Floating Layer */}
                    <motion.div
                        style={{ transform: "translateZ(50px)", translateY: translateZIcon }}
                        className="relative z-10"
                    >
                        <div className="w-16 h-16 inline-flex items-center justify-center mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                            {icon}
                        </div>
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                        style={{ transform: "translateZ(40px)" }}
                        className="absolute top-6 right-6"
                    >
                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {category}
                        </span>
                    </motion.div>

                    {/* Content - Middle Layer */}
                    <motion.div
                        style={{ transform: "translateZ(25px)", translateY: translateZContent }}
                        className="flex-1 relative z-10"
                    >
                        <h3 className="font-display text-2xl font-semibold text-charcoal mb-4 group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-gray-light text-base leading-relaxed mb-6">
                            {description}
                        </p>
                    </motion.div>

                    {/* Price & CTA - Front Layer */}
                    <motion.div
                        style={{ transform: "translateZ(45px)", translateY: translateZPrice }}
                        className="relative z-10 pt-4 border-t border-primary/10"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                                {price}
                            </span>
                            <a
                                href="#contact"
                                className="flex items-center gap-2 text-sm font-medium text-secondary-dark hover:text-primary transition-colors"
                            >
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Children slot */}
                    {children}
                </div>
            </motion.div>
        );
    }
);

ServiceParallaxCard.displayName = "ServiceParallaxCard";

export default ServiceParallaxCard;
