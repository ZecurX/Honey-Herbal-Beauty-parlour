"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
    Sparkles,
    Leaf,
    Heart,
    Palette,
    Scissors,
    Crown,
    Award,
    Users,
    Calendar,
    CheckCircle,
    Star,
    ArrowRight,
    TrendingUp,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring, type Variants } from "framer-motion"
import { useSettings } from "@/context/SettingsContext"

export default function AboutUsSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })
    const { settings } = useSettings()

    // Parallax effect for decorative elements
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        },
    }

    const services = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Herbal Facials",
            description:
                "Rejuvenating facials using natural herbs and organic ingredients. Our expert beauticians customize treatments for glowing, healthy skin.",
            position: "left",
        },
        {
            icon: <Scissors className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Hair Care",
            description:
                "Organic hair treatments, cuts, styling, and coloring with herbal products that nourish your hair while delivering stunning results.",
            position: "left",
        },
        {
            icon: <Crown className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Bridal Makeup",
            description:
                "Your special day deserves perfection. Our bridal packages include consultation, trial, and day-of services for a flawless look.",
            position: "left",
        },
        {
            icon: <Palette className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Decoration",
            description:
                "Enhance your beauty with our curated decoration services. From color consultations to complete makeovers, we perfect every detail.",
            position: "right",
        },
        {
            icon: <Leaf className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Body Treatments",
            description:
                "Full body scrubs, wraps, and massages using natural herbal blends. Experience relaxation and rejuvenation like never before.",
            position: "right",
        },
        {
            icon: <Heart className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-secondary" />,
            title: "Wellness Care",
            description:
                "Holistic beauty treatments combining ancient herbal wisdom with modern techniques for complete well-being and radiant beauty.",
            position: "right",
        },
    ]

    const stats = [
        { icon: <Award />, value: 5000, label: "Happy Customers", suffix: "+" },
        { icon: <Users />, value: 150, label: "Treatments Daily", suffix: "+" },
        { icon: <Calendar />, value: 15, label: "Years Experience", suffix: "" },
        { icon: <TrendingUp />, value: 98, label: "Satisfaction Rate", suffix: "%" },
    ]

    return (
        <section
            id="about-section"
            ref={sectionRef}
            className="w-full py-24 px-4 overflow-hidden relative"
            style={{
                background: "linear-gradient(to bottom, var(--color-bg-cream), var(--color-bg-warm))"
            }}
        >
            {/* Decorative background elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
                style={{
                    y: y1,
                    rotate: rotate1,
                    background: "rgba(212, 135, 15, 0.08)"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
                style={{
                    y: y2,
                    rotate: rotate2,
                    background: "rgba(139, 90, 43, 0.08)"
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full"
                style={{ background: "rgba(212, 135, 15, 0.4)" }}
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full"
                style={{ background: "rgba(196, 154, 26, 0.4)" }}
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
                    <motion.span
                        className="font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider"
                        style={{ color: "var(--color-primary)" }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Leaf className="w-4 h-4" />
                        DISCOVER OUR STORY
                    </motion.span>
                    <h2
                        className="text-4xl md:text-5xl font-light mb-4 text-center"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-charcoal)"
                        }}
                    >
                        About Us
                    </h2>
                    <motion.div
                        className="w-24 h-1"
                        style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-light))" }}
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                </motion.div>

                <motion.p
                    className="text-center max-w-2xl mx-auto mb-16"
                    style={{ color: "var(--color-gray-light)" }}
                    variants={itemVariants}
                >
                    {settings.aboutText?.split('\n\n')[0] ||
                        "At Honey Herbal Beauty Parlor, we believe in the power of nature for your beauty. Our expert beauticians use only the finest herbal and organic products to give you a rejuvenating experience that nourishes your skin and soul."}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Left Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "left")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`left-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.2}
                                    direction="left"
                                />
                            ))}
                    </div>

                    {/* Center Image */}
                    <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
                        <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
                            <motion.div
                                className="rounded-2xl overflow-hidden shadow-xl"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                                    alt="Honey Herbal Beauty Parlor"
                                    className="w-full h-full object-cover"
                                />
                                <motion.div
                                    className="absolute inset-0 flex items-end justify-center p-4"
                                    style={{
                                        background: "linear-gradient(to top, rgba(26, 26, 26, 0.6), transparent)"
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    <motion.a
                                        href="#services"
                                        className="px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                                        style={{
                                            background: "white",
                                            color: "var(--color-charcoal)"
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Our Services <ArrowRight className="w-4 h-4" />
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 border-4 rounded-2xl -m-3 z-[-1]"
                                style={{ borderColor: "var(--color-secondary-light)" }}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            ></motion.div>

                            {/* Floating accent elements */}
                            <motion.div
                                className="absolute -top-4 -right-8 w-16 h-16 rounded-full"
                                style={{ background: "rgba(212, 135, 15, 0.15)" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.9 }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full"
                                style={{ background: "rgba(196, 154, 26, 0.15)" }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.1 }}
                            ></motion.div>

                            {/* Additional decorative elements */}
                            <motion.div
                                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                                style={{ background: "var(--color-primary)" }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                                style={{ background: "var(--color-accent)" }}
                                animate={{
                                    y: [0, 10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            ></motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "right")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`right-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.2}
                                    direction="right"
                                />
                            ))}
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    ref={statsRef}
                    className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{ background: "var(--color-charcoal)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="flex-1">
                        <h3
                            className="text-2xl font-medium mb-2"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "white"
                            }}
                        >
                            Ready to experience natural beauty?
                        </h3>
                        <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            Let us pamper you with our herbal treatments.
                        </p>
                    </div>
                    <motion.a
                        href="#contact"
                        className="px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-colors"
                        style={{
                            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                            color: "white"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book an Appointment <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    )
}

interface ServiceItemProps {
    icon: React.ReactNode
    secondaryIcon?: React.ReactNode
    title: string
    description: string
    variants: Variants
    delay: number
    direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
    return (
        <motion.div
            className="flex flex-col group"
            variants={variants}
            transition={{ delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
                <motion.div
                    className="p-3 rounded-xl transition-colors duration-300 relative"
                    style={{
                        color: "var(--color-primary)",
                        background: "rgba(212, 135, 15, 0.1)"
                    }}
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                >
                    {icon}
                    {secondaryIcon}
                </motion.div>
                <h3
                    className="text-xl font-medium transition-colors duration-300 group-hover:text-primary"
                    style={{
                        color: "var(--color-charcoal)",
                        fontFamily: "var(--font-display)"
                    }}
                >
                    {title}
                </h3>
            </motion.div>
            <motion.p
                className="text-sm leading-relaxed pl-12"
                style={{ color: "var(--color-gray-light)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
                {description}
            </motion.p>
            <motion.div
                className="mt-3 pl-12 flex items-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "var(--color-primary)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
            >
                <span className="flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                </span>
            </motion.div>
        </motion.div>
    )
}

interface StatCounterProps {
    icon: React.ReactNode
    value: number
    label: string
    suffix: string
    delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: false })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 10,
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value)
            setHasAnimated(true)
        } else if (!isInView && hasAnimated) {
            springValue.set(0)
            setHasAnimated(false)
        }
    }, [isInView, value, springValue, hasAnimated])

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    return (
        <motion.div
            className="p-6 rounded-2xl flex flex-col items-center text-center group transition-colors duration-300"
            style={{ background: "rgba(255, 255, 255, 0.8)" }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay },
                },
            } as Variants}
            whileHover={{ y: -5, background: "rgba(255, 255, 255, 0.9)", transition: { duration: 0.2 } }}
        >
            <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                    background: "rgba(26, 26, 26, 0.05)",
                    color: "var(--color-primary)"
                }}
                whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
            >
                {icon}
            </motion.div>
            <motion.div
                ref={countRef}
                className="text-3xl font-bold flex items-center"
                style={{
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-display)"
                }}
            >
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p
                className="text-sm mt-1"
                style={{ color: "var(--color-gray-light)" }}
            >
                {label}
            </p>
            <motion.div
                className="w-10 h-0.5 mt-3 group-hover:w-16 transition-all duration-300"
                style={{ background: "var(--color-primary)" }}
            />
        </motion.div>
    )
}
