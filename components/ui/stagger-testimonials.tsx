"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestimonials } from '@/context/TestimonialsContext';

const SQRT_5000 = Math.sqrt(5000);

// Fallback testimonials if none loaded from API
const fallbackTestimonials = [
    {
        tempId: 0,
        testimonial: "The herbal facial was absolutely amazing! My skin has never felt so fresh and rejuvenated. The staff is incredibly professional.",
        by: "Priya S., Regular Client",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        rating: 5
    },
    {
        tempId: 1,
        testimonial: "Best bridal makeup experience! They made my special day even more beautiful. Highly recommend their herbal products.",
        by: "Anita M., Bride",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        rating: 5
    },
    {
        tempId: 2,
        testimonial: "I love that they use all-natural products. The results are visible and my hair has never been healthier. Thank you, Honey Herbal!",
        by: "Kavitha R., Loyal Customer",
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        rating: 5
    },
    {
        tempId: 3,
        testimonial: "Wonderful ambiance and excellent service. The herbal body treatment was so relaxing. Will definitely come back!",
        by: "Deepa K., First Time Visitor",
        imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        rating: 5
    },
    {
        tempId: 4,
        testimonial: "My go-to place for all beauty treatments. The organic products make such a difference. My skin glows after every visit!",
        by: "Meera S., Premium Member",
        imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        rating: 5
    }
];

interface TestimonialItem {
    tempId: number;
    testimonial: string;
    by: string;
    imgSrc: string;
    rating: number;
}

interface TestimonialCardProps {
    position: number;
    testimonial: TestimonialItem;
    handleMove: (steps: number) => void;
    cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    position,
    testimonial,
    handleMove,
    cardSize
}) => {
    const isCenter = position === 0;

    // Render stars for rating
    const renderStars = (rating: number = 5) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={cn(
                    "w-4 h-4",
                    i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                )}
            />
        ));
    };

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out rounded-2xl",
                isCenter
                    ? "z-10 border-primary shadow-lg"
                    : "z-0 border-secondary/30 hover:border-primary/50"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                background: isCenter
                    ? "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)"
                    : "rgba(255, 255, 255, 0.95)",
                transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter
                    ? "0px 8px 0px 4px var(--color-secondary-light), 0 20px 50px rgba(212, 135, 15, 0.25)"
                    : "0 4px 20px rgba(0, 0, 0, 0.08)"
            }}
        >
            {/* Quote icon */}
            <Quote
                className={cn(
                    "w-8 h-8 mb-4 opacity-30",
                    isCenter ? "text-white" : "text-primary"
                )}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
            </div>

            <h3 className={cn(
                "text-sm sm:text-base font-medium leading-relaxed",
                isCenter ? "text-white" : "text-charcoal"
            )}
                style={{ fontFamily: "var(--font-display)" }}
            >
                &ldquo;{testimonial.testimonial}&rdquo;
            </h3>

            <p className={cn(
                "absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 mt-2 text-xs sm:text-sm italic",
                isCenter ? "text-white/80" : "text-gray-light"
            )}>
                - {testimonial.by}
            </p>
        </div>
    );
};

export const StaggerTestimonials: React.FC = () => {
    const [cardSize, setCardSize] = useState(365);
    const { testimonials: contextTestimonials } = useTestimonials();

    // Convert context testimonials to the format needed for the carousel
    const processedTestimonials: TestimonialItem[] = useMemo(() => {
        if (contextTestimonials && contextTestimonials.length > 0) {
            return contextTestimonials.map((t, index) => ({
                tempId: index,
                testimonial: t.testimonial || t.quote || '',
                by: `${t.name || t.clientName || 'Client'}, ${t.role || 'Valued Customer'}`,
                imgSrc: t.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
                rating: t.rating
            }));
        }
        return fallbackTestimonials;
    }, [contextTestimonials]);

    const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(fallbackTestimonials);

    // Update testimonialsList when processedTestimonials changes
    useEffect(() => {
        setTestimonialsList(processedTestimonials);
    }, [processedTestimonials]);

    const handleMove = (steps: number) => {
        const newList = [...testimonialsList];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setTestimonialsList(newList);
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia("(min-width: 640px)");
            setCardSize(matches ? 365 : 290);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <section className="py-24 overflow-hidden relative" style={{
            background: "linear-gradient(135deg, #2d2520 0%, #1a1a1a 50%, #252018 100%)"
        }}>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
            <div className="decoration-blob decoration-blob-gold absolute top-20 right-20 w-64 h-64 opacity-20"></div>
            <div className="decoration-blob decoration-blob-primary absolute bottom-20 left-20 w-48 h-48 opacity-30"></div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-soft">
                        What Our Clients Say
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full"></div>
                </div>

                {/* Testimonials Carousel */}
                <div
                    className="relative w-full"
                    style={{ height: 500 }}
                >
                    {testimonialsList.map((testimonial, index) => {
                        const position = testimonialsList.length % 2
                            ? index - (testimonialsList.length + 1) / 2
                            : index - testimonialsList.length / 2;
                        return (
                            <TestimonialCard
                                key={testimonial.tempId}
                                testimonial={testimonial}
                                handleMove={handleMove}
                                position={position}
                                cardSize={cardSize}
                            />
                        );
                    })}

                    {/* Navigation Buttons - No backdrop blur for performance */}
                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-3">
                        <button
                            onClick={() => handleMove(-1)}
                            className={cn(
                                "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-300",
                                "bg-white border-2 border-secondary/30 hover:bg-primary hover:text-white hover:border-primary",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                                "shadow-lg hover:shadow-xl hover:scale-105"
                            )}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleMove(1)}
                            className={cn(
                                "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-300",
                                "bg-white border-2 border-secondary/30 hover:bg-primary hover:text-white hover:border-primary",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                                "shadow-lg hover:shadow-xl hover:scale-105"
                            )}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaggerTestimonials;
