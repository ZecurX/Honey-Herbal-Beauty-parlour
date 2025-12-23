'use client';

import { useCallback, useRef, useState, MouseEvent, ReactNode, ButtonHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleState {
    x: number;
    y: number;
    size: number;
    key: number;
    isLeaving?: boolean;
}

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export function RippleButton({
    children,
    className = "",
    variant = 'primary',
    ...props
}: RippleButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripple, setRipple] = useState<RippleState | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Theme-based styles matching Honey Herbal colors
    const variantStyles = {
        primary: {
            base: "bg-gradient-to-br from-primary to-primary-dark text-white border-transparent",
            rippleColor: "bg-white/30",
            hoverText: "text-white"
        },
        secondary: {
            base: "bg-gradient-to-br from-secondary to-secondary-dark text-white border-transparent",
            rippleColor: "bg-white/30",
            hoverText: "text-white"
        },
        outline: {
            base: "bg-transparent text-primary border-2 border-primary",
            rippleColor: "bg-primary",
            hoverText: "text-white"
        }
    };

    const currentVariant = variantStyles[variant];

    const createRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (isHovered || !buttonRef.current) return;
        setIsHovered(true);

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple({ x, y, size, key: Date.now() });
    }, [isHovered]);

    const removeRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (event.target !== event.currentTarget) return;
        setIsHovered(false);

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple({ x, y, size, key: Date.now(), isLeaving: true });
    }, []);

    const handleMouseMove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || !isHovered || !ripple) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple(prev => prev ? { ...prev, x, y } : null);
    }, [isHovered, ripple]);

    return (
        <button
            ref={buttonRef}
            className={`
        relative flex items-center justify-center overflow-hidden 
        rounded-full shadow-md px-8 py-3 text-base font-medium 
        transition-all duration-500 ease-out
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
        ${currentVariant.base}
        ${isHovered ? currentVariant.hoverText : ''}
        ${className}
      `}
            onMouseEnter={(e) => {
                if (e.target === e.currentTarget) {
                    createRipple(e);
                }
            }}
            onMouseLeave={(e) => {
                if (e.target === e.currentTarget) {
                    removeRipple(e);
                }
            }}
            onMouseMove={handleMouseMove}
            {...props}
        >
            <span className="relative z-[2] flex items-center gap-2">{children}</span>

            <AnimatePresence>
                {ripple && (
                    <motion.span
                        key={ripple.key}
                        className={`absolute rounded-full pointer-events-none z-[1] ${currentVariant.rippleColor}`}
                        style={{
                            width: ripple.size,
                            height: ripple.size,
                            left: ripple.x,
                            top: ripple.y,
                            x: '-50%',
                            y: '-50%',
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: ripple.isLeaving ? 0 : 1,
                            x: '-50%',
                            y: '-50%',
                        }}
                        exit={{ scale: 0, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        onAnimationComplete={() => {
                            if (ripple.isLeaving) {
                                setRipple(null);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </button>
    );
}

// Demo Component for testing
export function RippleButtonDemo() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-bg-cream">
            <div className="flex flex-col gap-6 items-center">
                <RippleButton variant="primary" onClick={() => alert('Primary clicked!')}>
                    Primary Button
                </RippleButton>
                <RippleButton variant="secondary" onClick={() => alert('Secondary clicked!')}>
                    Secondary Button
                </RippleButton>
                <RippleButton variant="outline" onClick={() => alert('Outline clicked!')}>
                    Outline Button
                </RippleButton>
            </div>
        </div>
    );
}

export default RippleButton;

// RippleLink - For anchor elements with ripple effect
interface RippleLinkProps {
    children: ReactNode;
    href: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
    target?: string;
    rel?: string;
}

export function RippleLink({
    children,
    href,
    className = "",
    variant = 'primary',
    target,
    rel
}: RippleLinkProps) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [ripple, setRipple] = useState<RippleState | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
        primary: {
            base: "bg-gradient-to-br from-primary to-primary-dark text-white border-transparent shadow-md",
            rippleColor: "bg-white/30",
            hoverText: "text-white"
        },
        secondary: {
            base: "bg-gradient-to-br from-secondary to-secondary-dark text-white border-transparent shadow-md",
            rippleColor: "bg-white/30",
            hoverText: "text-white"
        },
        outline: {
            base: "bg-transparent text-primary border-2 border-primary",
            rippleColor: "bg-primary",
            hoverText: "text-white"
        },
        whatsapp: {
            base: "bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white border-transparent shadow-md",
            rippleColor: "bg-white/30",
            hoverText: "text-white"
        }
    };

    const currentVariant = variantStyles[variant];

    const createRipple = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (isHovered || !linkRef.current) return;
        setIsHovered(true);

        const link = linkRef.current;
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple({ x, y, size, key: Date.now() });
    }, [isHovered]);

    const removeRipple = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (event.target !== event.currentTarget) return;
        setIsHovered(false);

        const link = linkRef.current;
        if (!link) return;

        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple({ x, y, size, key: Date.now(), isLeaving: true });
    }, []);

    const handleMouseMove = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (!linkRef.current || !isHovered || !ripple) return;

        const link = linkRef.current;
        const rect = link.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setRipple(prev => prev ? { ...prev, x, y } : null);
    }, [isHovered, ripple]);

    return (
        <a
            ref={linkRef}
            href={href}
            target={target}
            rel={rel}
            className={`
                relative flex items-center justify-center overflow-hidden 
                rounded-full px-5 py-2.5 text-sm font-medium 
                transition-all duration-500 ease-out
                hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
                ${currentVariant.base}
                ${isHovered ? currentVariant.hoverText : ''}
                ${className}
            `}
            onMouseEnter={(e) => {
                if (e.target === e.currentTarget) {
                    createRipple(e);
                }
            }}
            onMouseLeave={(e) => {
                if (e.target === e.currentTarget) {
                    removeRipple(e);
                }
            }}
            onMouseMove={handleMouseMove}
        >
            <span className="relative z-[2] flex items-center gap-2">{children}</span>

            <AnimatePresence>
                {ripple && (
                    <motion.span
                        key={ripple.key}
                        className={`absolute rounded-full pointer-events-none z-[1] ${currentVariant.rippleColor}`}
                        style={{
                            width: ripple.size,
                            height: ripple.size,
                            left: ripple.x,
                            top: ripple.y,
                            x: '-50%',
                            y: '-50%',
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: ripple.isLeaving ? 0 : 1,
                            x: '-50%',
                            y: '-50%',
                        }}
                        exit={{ scale: 0, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        onAnimationComplete={() => {
                            if (ripple.isLeaving) {
                                setRipple(null);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </a>
    );
}

