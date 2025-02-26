import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Share2, Heart } from 'lucide-react';

// Mock event data (in a real app, this would come from an API)
const event = {
  id: 1,
  title: "UEFA Euro 2024",
  description: "Les matchs qui vont marquer l'histoire du football européen. Vivez l'ambiance électrique des plus grands stades européens et supportez votre équipe favorite lors de cet événement exceptionnel qui réunit les meilleures nations du football européen.",
  image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  date: "20-25 Juin",
  location: "Berlin, Allemagne",
  category: "Sports",
  price: "À partir de 90€",
  venue: "Olympiastadion Berlin",
  capacity: "74,475 places",
  organizer: "UEFA",
  additionalImages: [
    "https://images.unsplash.com/photo-1540552999122-a0ac7a9c0ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1510051640316-cee39563ddab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ],
  ticketTypes: [
    {
      name: "VIP",
      price: "290.00€",
      description: "Profitez d'une expérience exclusive avec accès au salon VIP et prestations premium",
      features: [
        "Accès au salon VIP",
        "Place premium",
        "Service de restauration inclus",
        "Parking VIP"
      ]
    },
    {
      name: "Standard",
      price: "175.00€",
      description: "Une expérience confortable pour profiter pleinement de l'événement",
      features: [
        "Siège en tribune centrale",
        "Accès à tous les services",
        "Programme gratuit"
      ]
    },
    {
      name: "VIP+",
      price: "450.00€",
      description: "L'expérience ultime avec un accès total et des services exclusifs",
      features: [
        "Accès privatif aux vestiaires",
        "Place VIP front row",
        "Cocktail et réception spéciale"
      ]
    }
  ]
};

// Suggested events data
const suggestedEvents = [
  {
    id: 2,
    title: "Ligue des Champions - Finale 2024",
    description: "La grande finale de la plus prestigieuse compétition européenne",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "1 Juin 2024",
    location: "Londres, Royaume-Uni",
    category: "Sports",
    price: "À partir de 150€"
  },
  {
    id: 3,
    title: "Coupe du Monde de Rugby 2024",
    description: "Les meilleures équipes mondiales s'affrontent",
    image: "https://images.unsplash.com/photo-1544298621-35a764866ff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "15-30 Septembre",
    location: "Paris, France",
    category: "Sports",
    price: "À partir de 80€"
  },
  {
    id: 4,
    title: "Roland Garros 2024",
    description: "Le grand tournoi de tennis sur terre battue",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "20 Mai - 9 Juin",
    location: "Paris, France",
    category: "Sports",
    price: "À partir de 70€"
  }
];

export const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState(event.image);

  return (
    <div className="pt-20 bg-black min-h-screen">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Link 
          to="/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour aux événements
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          {/* Left column */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <button 
                onClick={() => setSelectedImage(event.image)}
                className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                  selectedImage === event.image ? 'ring-2 ring-cyan-500' : ''
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </button>
              {event.additionalImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                    selectedImage === image ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${event.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Event details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" strokeWidth={1.5} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                <p className="text-gray-400 leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Informations</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Lieu", value: event.venue },
                    { label: "Capacité", value: event.capacity },
                    { label: "Organisateur", value: event.organizer },
                    { label: "Catégorie", value: event.category }
                  ].map((item) => (
                    <div key={item.label} className="bg-[#111111] rounded-xl p-4">
                      <dt className="text-gray-400 text-sm mb-1">{item.label}</dt>
                      <dd className="text-white font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Ticket types - Mobile only */}
              <div className="lg:hidden">
                <h2 className="text-xl font-semibold text-white mb-6">Sélectionnez votre billet</h2>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket) => (
                    <div 
                      key={ticket.name}
                      className="bg-[#111111] rounded-xl p-6 space-y-4 hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold mb-1">{ticket.name}</h3>
                          <p className="text-gray-400 text-sm">{ticket.description}</p>
                        </div>
                        <span className="text-white font-semibold">{ticket.price}</span>
                      </div>
                      <ul className="space-y-2">
                        {ticket.features.map((feature, index) => (
                          <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full btn-primary">
                        Sélectionner
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Events Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Événements similaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedEvents.map((suggestedEvent) => (
                    <div 
                      key={suggestedEvent.id}
                      onClick={() => {
                        navigate(`/events/${suggestedEvent.id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="bg-[#111111] rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-cyan-500/10"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={suggestedEvent.image}
                          alt={suggestedEvent.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/90 text-white text-sm font-medium">
                            {suggestedEvent.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 line-clamp-1">{suggestedEvent.title}</h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{suggestedEvent.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{suggestedEvent.date}</span>
                          <span className="text-cyan-400">{suggestedEvent.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Ticket types (Desktop only) */}
          <div className="hidden lg:block lg:border-l lg:border-gray-800 lg:pl-8">
            <h2 className="text-xl font-semibold text-white mb-6">Sélectionnez votre billet</h2>
            <div className="space-y-4">
              {event.ticketTypes.map((ticket) => (
                <div 
                  key={ticket.name}
                  className="bg-[#111111] rounded-xl p-6 space-y-4 hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{ticket.name}</h3>
                      <p className="text-gray-400 text-sm">{ticket.description}</p>
                    </div>
                    <span className="text-white font-semibold">{ticket.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {ticket.features.map((feature, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full btn-primary">
                    Sélectionner
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};