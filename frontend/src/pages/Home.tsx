import React, { useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { PopularEventsSection } from '../components/sections/PopularEventsSection';
import { SponsorsSection } from '../components/sections/SponsorsSection';
import { FeaturedEventsSection } from '../components/sections/FeaturedEventsSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Home: React.FC = () => {
  // Initialize intersection observer when component mounts
  useIntersectionObserver('.section-fade-up');

  // Reset animations when component mounts
  useEffect(() => {
    document.querySelectorAll('.section-fade-up').forEach(el => {
      el.classList.remove('visible');
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <PopularEventsSection />
      <SponsorsSection />
      <FeaturedEventsSection />
      <NewsletterSection />
    </div>
  );
};