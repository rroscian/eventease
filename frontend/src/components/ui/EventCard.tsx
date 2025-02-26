import React from 'react';
import { MapPin, Calendar, Users, Clock, Tag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id?: number;
  title: string;
  location: string;
  image: string;
  date?: string;
  time?: string;
  price?: string;
  category?: string;
  capacity?: string;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  id = 1,
  title,
  location,
  image,
  date,
  time,
  price,
  category,
  capacity,
  isFavorite = false,
  onFavoriteClick
}) => {
  return (
    <Link to={`/events/${id}`} className="group cursor-pointer">
      <div className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-black/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 dark:bg-black/50 text-gray-900 dark:text-white backdrop-blur-sm">
                <Tag className="h-3.5 w-3.5" strokeWidth={2} />
                {category}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavoriteClick?.();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
            {title}
          </h3>

          {/* Details */}
          <div className="space-y-2 mb-4">
            {date && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="text-sm">{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="text-sm">{time}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="text-sm">{location}</span>
            </div>
            {capacity && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="text-sm">{capacity}</span>
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            {price && (
              <div className="text-gray-900 dark:text-white font-medium">
                {price}
              </div>
            )}
            <div className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors">
              Réserver
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};