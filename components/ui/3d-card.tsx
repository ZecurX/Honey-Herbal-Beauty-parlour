"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Gift, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the Interactive3DPackageCard component.
 * Adapted for Honey Herbal Beauty Parlor packages.
 */
export interface Interactive3DPackageCardProps {
    /** The main title for the card, e.g., "Bridal Glow Package" */
    title: string;
    /** Package description */
    description: string;
    /** The URL for the background image. */
    imageUrl: string;
    /** Discount badge text, e.g., "Save 20%" */
    discount?: string;
    /** Valid until date string */
    validUntil?: string;
    /** The text for the primary action button */
    actionText?: string;
    /** Callback function when the primary action button is clicked. */
    onActionClick?: () => void;
    /** Optional additional class names for custom styling. */
    className?: string;
    /** Animation delay index */
    index?: number;
}

/**
 * A responsive 3D tilt card for displaying beauty parlor packages.
 * Features honey/amber theme and glassmorphism effects.
 */
export const Interactive3DPackageCard = React.forwardRef<
    HTMLDivElement,
    Interactive3DPackageCardProps
>(
    (
        {
            title,
            description,
            imageUrl,
            discount,
            validUntil,
            actionText = "Book This Package",
            onActionClick,
            className,
            index = 0
        },
        ref
    ) => {
        // --- 3D Tilt Animation Logic ---
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const springConfig = { damping: 15, stiffness: 150 };
        const springX = useSpring(mouseX, springConfig);
        const springY = useSpring(mouseY, springConfig);

        const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
        const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const { width, height, left, top } = rect;
            const mouseXVal = e.clientX - left;
            const mouseYVal = e.clientY - top;
            const xPct = mouseXVal / width - 0.5;
            const yPct = mouseYVal / height - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        };

        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };

        const handleBookClick = () => {
            if (onActionClick) {
                onActionClick();
            } else {
                // Default scroll to contact
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "relative h-[28rem] w-full rounded-2xl bg-transparent cursor-pointer group",
                    className
                )}
            >
                <div
                    style={{
                        transform: "translateZ(40px)",
                        transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-0 grid h-full w-full rounded-2xl shadow-xl overflow-hidden border-2 border-secondary/20 group-hover:border-primary/50 transition-colors duration-300"
                >
                    {/* Background Image */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay - Honey Theme */}
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-primary/30 via-primary-dark/50 to-charcoal/90" />

                    {/* Discount Badge - positioned top-left */}
                    {discount && (
                        <motion.div
                            style={{ transform: "translateZ(60px)" }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-secondary to-accent text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5"
                        >
                            <Sparkles className="w-4 h-4" />
                            {discount}
                        </motion.div>
                    )}



                    {/* Card Content */}
                    <div className="relative flex flex-col justify-between h-full p-6 pt-20 text-white">

                        {/* Gift Icon - top left below badges */}
                        <motion.div
                            style={{ transform: "translateZ(50px)" }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-inset ring-white/30">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                        </motion.div>

                        {/* Bottom Content */}
                        <div>
                            <motion.h3
                                style={{ transform: "translateZ(50px)" }}
                                className="text-2xl font-bold mb-2 font-display"
                            >
                                {title}
                            </motion.h3>
                            <motion.p
                                style={{ transform: "translateZ(40px)" }}
                                className="text-sm text-white/80 mb-4 line-clamp-2"
                            >
                                {description}
                            </motion.p>

                            {/* Valid Until */}
                            {validUntil && (
                                <motion.div
                                    style={{ transform: "translateZ(35px)" }}
                                    className="flex items-center gap-2 text-xs text-secondary-light mb-4"
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>Valid until: {new Date(validUntil).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</span>
                                </motion.div>
                            )}

                            {/* Action Button */}
                            <motion.button
                                onClick={handleBookClick}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ transform: "translateZ(45px)" }}
                                className={cn(
                                    "w-full rounded-xl py-3.5 text-center font-semibold text-white transition-all duration-300",
                                    "bg-gradient-to-r from-primary to-primary-dark hover:from-secondary hover:to-accent",
                                    "ring-1 ring-inset ring-white/20 shadow-lg hover:shadow-xl"
                                )}
                            >
                                {actionText}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
);
Interactive3DPackageCard.displayName = "Interactive3DPackageCard";

export default Interactive3DPackageCard;
