import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, User } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Inscription" 
        description="Créez votre compte Event Ease et commencez à organiser ou réserver vos événements."
      />
      
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Column - Image */}
          <div 
            className="hidden lg:block relative overflow-hidden"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent" />
            
            {/* Branding */}
            <div className="relative h-full flex items-center justify-center p-12">
              <div className="w-full max-w-lg">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Event<span className="text-cyan-500">.</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Créez et gérez vos événements en toute simplicité. Rejoignez notre communauté.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Options */}
          <div className="flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              {/* Back Button */}
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="h-5 w-5" />
                Retour à l'accueil
              </button>

              {/* Header */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choisissez votre profil</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sélectionnez le type de compte que vous souhaitez créer
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/register/organizer')}
                  className="w-full bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-left hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building2 className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">Organisateur</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Créez et gérez vos propres événements
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/register/client')}
                  className="w-full bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-left hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">Client</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Découvrez et réservez des événements
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-cyan-500 hover:text-cyan-400">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};