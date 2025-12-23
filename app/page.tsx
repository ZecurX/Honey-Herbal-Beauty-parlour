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
  // Scroll reveal effect using Intersection Observer for better reliability
  const initRevealAnimations = useCallback(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    // Create an Intersection Observer for reliable visibility detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from entering viewport
        threshold: 0.1, // Trigger when at least 10% is visible
      }
    );

    // Observe all reveal elements
    revealElements.forEach((el) => observer.observe(el));

    // Also run a fallback scroll-based check for elements already in view
    const checkVisibility = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('visible');
        }
      });
    };

    // Run visibility check after a small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      checkVisibility();
      // Double-check after a frame to catch any elements that might have been missed
      requestAnimationFrame(checkVisibility);
    });

    // Also listen to scroll events as a fallback
    window.addEventListener('scroll', checkVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
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
