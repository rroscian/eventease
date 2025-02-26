import { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (eventId: number) => {
    setFavorites(prev => [...prev, eventId]);
  };

  const removeFavorite = (eventId: number) => {
    setFavorites(prev => prev.filter(id => id !== eventId));
  };

  const isFavorite = (eventId: number) => {
    return favorites.includes(eventId);
  };

  const toggleFavorite = (event: Event) => {
    if (isFavorite(event.id)) {
      removeFavorite(event.id);
      return false;
    } else {
      addFavorite(event.id);
      return true;
    }
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};