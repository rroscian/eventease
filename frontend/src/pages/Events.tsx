import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const categories = [
  { name: 'Tous', active: true },
  { name: 'Concerts', active: false },
  { name: 'Théâtres', active: false },
  { name: 'Sports', active: false },
  { name: 'Festivals', active: false },
  { name: 'Expositions', active: false }
];

const events = [
  {
    id: 1,
    title: "UEFA Euro 2024",
    description: "Les matchs qui vont marquer l'histoire du football européen",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "20-25 Juin",
    location: "Berlin, Allemagne",
    category: "Sports",
    price: "À partir de 90€"
  },
  {
    id: 2,
    title: "Concert de Coldplay",
    description: "Music of the Spheres World Tour",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "15 Juillet",
    location: "Paris, France",
    category: "Concerts",
    price: "À partir de 75€"
  },
  {
    id: 3,
    title: "Festival de Cannes",
    description: "77ème édition du festival international du film",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "14-25 Mai",
    location: "Cannes, France",
    category: "Festivals",
    price: "Sur invitation"
  },
  {
    id: 4,
    title: "Exposition Van Gogh",
    description: "Immersion dans l'univers du peintre",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "Jusqu'au 31 Août",
    location: "Amsterdam, Pays-Bas",
    category: "Expositions",
    price: "À partir de 20€"
  },
  {
    id: 5,
    title: "Le Roi Lion - La Comédie Musicale",
    description: "Le spectacle événement de Broadway",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "Tous les jours",
    location: "Londres, Royaume-Uni",
    category: "Théâtres",
    price: "À partir de 35€"
  }
];

const locations = [
  "Toutes les villes",
  "Paris, France",
  "Londres, Royaume-Uni",
  "Berlin, Allemagne",
  "Amsterdam, Pays-Bas",
  "Cannes, France"
];

const prices = [
  { label: "Tous les prix", value: "all" },
  { label: "Gratuit", value: "free" },
  { label: "< 20€", value: "under20" },
  { label: "20€ - 50€", value: "20to50" },
  { label: "50€ - 100€", value: "50to100" },
  { label: "> 100€", value: "over100" }
];

export const Events: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Tous');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Toutes les villes");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  // Update URL when filters change
  const updateFilters = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'Tous') params.set('category', category);
    setSearchParams(params);
  };

  // Filter events based on search term and selected category
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'Tous' || event.category === selectedCategory;
      const matchesLocation = selectedLocation === "Toutes les villes" || event.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Découvrez tous nos événements
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Des expériences uniques sélectionnées pour vous
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateFilters(e.target.value, selectedCategory);
                  }}
                  className="w-full px-6 py-3 rounded-full bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-white/20 pr-12 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button 
                className={`p-3 rounded-full transition-colors ${
                  isFilterMenuOpen 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-white/20 dark:hover:bg-white/20'
                }`}
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                {isFilterMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Filter className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Filter Menu */}
            {isFilterMenuOpen && (
              <div className="mt-6 p-6 bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 max-w-2xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lieu
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 focus:outline-none focus:border-cyan-500/50"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location} className="bg-white dark:bg-gray-900">
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prix
                    </label>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 focus:outline-none focus:border-cyan-500/50"
                    >
                      {prices.map((price) => (
                        <option key={price.value} value={price.value} className="bg-white dark:bg-gray-900">
                          {price.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <div className="flex gap-3 sm:gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                updateFilters(searchTerm, category.name);
              }}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                ${category.name === selectedCategory
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#252525]'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/90 text-white text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" strokeWidth={1.5} />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" strokeWidth={1.5} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white font-medium">{event.price}</span>
                      <button className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Aucun événement trouvé</p>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};