import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page non trouvée" 
        description="La page que vous recherchez n'existe pas."
      />
      
      <div className="min-h-screen bg-white dark:bg-black flex items-center relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/95 to-white/90 dark:from-black dark:via-black/95 dark:to-black/90">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black" />
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Left Column - Error Message */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[120px] sm:text-[180px] font-bold text-gray-900 dark:text-white leading-none mb-8 tracking-tight">
                4<span className="text-cyan-500">0</span>4
              </h1>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Page Non Trouvée
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg">
                Désolé, la page que vous recherchez semble avoir disparu dans la foule. Retournez à l'accueil pour découvrir d'autres événements exceptionnels.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Retour</span>
                </Link>
                
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Home className="h-5 w-5" />
                  <span>Accueil</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Decorative Elements */}
            <div className="lg:flex-1 w-full max-w-lg">
              <div className="relative">
                {/* Animated Circles */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]">
                  <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-pulse" />
                  <div className="absolute inset-[25%] border-2 border-cyan-500/15 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  <div className="absolute inset-[50%] border-2 border-cyan-500/10 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>

                {/* Stats */}
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { label: 'Événements', value: '500+' },
                    { label: 'Utilisateurs', value: '50K+' },
                    { label: 'Organisateurs', value: '100+' },
                    { label: 'Note moyenne', value: '4.8/5' }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10"
                    >
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};