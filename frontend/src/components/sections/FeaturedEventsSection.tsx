import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const FeaturedEventsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-black section-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Événements à venir</h2>
          <Link 
            to="/events"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors group text-sm sm:text-base"
          >
            Voir plus d'événements
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-4 sm:gap-6">
          {/* Main Featured Event */}
          <div 
            className="relative rounded-2xl overflow-hidden aspect-[16/9] group cursor-pointer"
            onClick={() => navigate('/events/1')}
          >
            <img
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="UEFA Euro 2024"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-black via-gray-900/50 dark:via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">UEFA Euro 2024 : Les matchs qui vont marquer l'histoire</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  Vivez l'ambiance électrique des plus grands stades européens.
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                  <span>20-25 Juin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Events */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {[
              {
                id: 2,
                title: "Concert de Coldplay",
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                date: "25-30 Juin"
              },
              {
                id: 3,
                title: "Festival de Cannes",
                image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                date: "14-25 Mai"
              },
              {
                id: 4,
                title: "Exposition Van Gogh",
                image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                date: "Jusqu'au 31 Août"
              }
            ].map((event) => (
              <div 
                key={event.id}
                className="relative rounded-xl overflow-hidden aspect-[16/5] sm:aspect-[16/4] group cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-black via-gray-900/50 dark:via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};