'use client';

import { useEffect, useCallback } from 'react';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import Services from '@/components/public/Services';
import AboutUsSection from '@/components/ui/about-us-section';
import Gallery from '@/components/public/Gallery';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import Offers from '@/components/public/Offers';
import { StackedCircularFooter } from '@/components/ui/stacked-circular-footer';

export default function Home() {
  // Scroll reveal effect using Intersection Observer - optimized for performance
  const initRevealAnimations = useCallback(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    // Create an Intersection Observer for reliable visibility detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve once visible for better performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly earlier
        threshold: 0.05, // Lower threshold for faster response
      }
    );

    // Observe all reveal elements
    revealElements.forEach((el) => observer.observe(el));

    // Initial check for elements already in viewport (no scroll listener needed)
    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timeoutId = setTimeout(() => {
      const cleanup = initRevealAnimations();
      return cleanup;
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [initRevealAnimations]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <AboutUsSection />
      <Gallery />
      <StaggerTestimonials />
      <Offers />
      <StackedCircularFooter />
    </main>
  );
}
