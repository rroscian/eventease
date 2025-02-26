import React from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventCard } from '../ui/EventCard';

const categories = [
  { name: 'Concerts', active: true },
  { name: 'Théâtres', active: false },
  { name: 'Sports', active: false },
  { name: 'Festivals', active: false },
  { name: 'Plus', active: false }
];

const popularEvents = [
  {
    title: "Concert de Coldplay",
    location: "France, paris",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Festival de Cannes",
    location: "France, Cannes",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Exposition Van Gogh",
    location: "Pays-Bas, Amsterdam",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Le Roi Lion",
    location: "Royaume-Uni, Londres",
    image: "https://images.unsplash.com/photo-1501281668745-f7 f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
];

export const PopularEventsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-black section-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Événements Populaires</h2>
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Voir tous les événements
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                ${category.active 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#252525]'}`}
            >
              {category.name}
            </button>
          ))}
          <button 
            className="p-2.5 sm:p-3 rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#252525] transition-all duration-300"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};