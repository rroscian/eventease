import React from 'react';
import { Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 section-fade-up">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/80 dark:from-black/80 dark:via-black/70 dark:to-black/80 backdrop-blur-sm" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ne manquez plus aucun événement !</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres exclusives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-6 py-3 rounded-full bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-white/20 w-full focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
          />
          <button className="btn-primary whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 py-3">
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            <span>S'inscrire</span>
          </button>
        </div>
      </div>
    </section>
  );
};