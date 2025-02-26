import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80 dark:from-black/80 dark:via-black/50 dark:to-black/80 backdrop-blur-[2px]" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in leading-tight">
          Découvrez des<br />Événements Inoubliables
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-200 mb-12 max-w-2xl animate-fade-in-delay leading-relaxed">
          Explorez une sélection unique d'événements culturels, sportifs et artistiques. 
          Réservez vos places en quelques clics pour des moments exceptionnels.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 animate-fade-in-delay-2">
          {/* Client Registration */}
          <button 
            onClick={() => navigate('/register/client')}
            className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-900 rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <User className="h-4 w-4 text-cyan-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Créer un compte client</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Réservez vos événements</div>
            </div>
          </button>

          {/* Organizer Registration */}
          <button 
            onClick={() => navigate('/register/organizer')}
            className="group flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white rounded-full text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-cyan-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Devenir organisateur</div>
              <div className="text-sm text-gray-300 dark:text-gray-600">Créez vos événements</div>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 animate-fade-in-delay-2">
          {[
            { value: '500+', label: 'Événements' },
            { value: '50K+', label: 'Utilisateurs' },
            { value: '100+', label: 'Organisateurs' },
            { value: '4.8/5', label: 'Note moyenne' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};