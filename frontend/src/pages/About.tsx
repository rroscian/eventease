import React from 'react';
import { SEO } from '../components/SEO';
import { Calendar, Users, Trophy, Target, Star, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="À propos" 
        description="Découvrez l'histoire d'Event Ease, notre mission et notre équipe."
      />

      <div className="min-h-screen bg-white dark:bg-black pt-20">
        {/* Hero Section */}
        <div className="relative h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
            <h1 className="text-7xl font-bold text-gray-900 dark:text-white">
              À propos<span className="text-cyan-500">.</span>
            </h1>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                  Chez Event Ease, nous croyons que chaque événement est une opportunité unique de créer des moments inoubliables. Notre mission est de simplifier l'organisation et la découverte d'événements, en connectant les organisateurs passionnés avec un public enthousiaste.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '500+', label: 'Événements' },
                    { value: '50K+', label: 'Utilisateurs' },
                    { value: '100+', label: 'Organisateurs' },
                    { value: '4.8/5', label: 'Note moyenne' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-[#111111] rounded-xl p-6">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Event Ease Mission"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl w-48 h-48 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-16 md:py-24 bg-gray-100 dark:bg-[#111111] overflow-hidden">
          {/* Flowing background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
            <div className="absolute inset-0 bg-gray-100/90 dark:bg-[#111111]/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/80 to-gray-100 dark:via-[#111111]/80 dark:to-[#111111]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Nos Valeurs</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Des principes qui guident chacune de nos actions et décisions pour offrir la meilleure expérience possible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Passion",
                  description: "Nous mettons tout notre cœur dans chaque aspect de notre service."
                },
                {
                  icon: Users,
                  title: "Communauté",
                  description: "Nous créons des connexions significatives entre organisateurs et participants."
                },
                {
                  icon: Trophy,
                  title: "Excellence",
                  description: "Nous visons l'excellence dans chaque détail de notre plateforme."
                },
                {
                  icon: Target,
                  title: "Innovation",
                  description: "Nous repoussons constamment les limites de ce qui est possible."
                },
                {
                  icon: Star,
                  title: "Qualité",
                  description: "Nous garantissons une expérience de première classe à chaque utilisateur."
                },
                {
                  icon: Calendar,
                  title: "Fiabilité",
                  description: "Nous sommes un partenaire de confiance sur qui vous pouvez compter."
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl p-6 hover:bg-white/60 dark:hover:bg-black/60 transition-colors group border border-gray-200/50 dark:border-white/5"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre Équipe</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Des professionnels passionnés qui travaillent chaque jour pour rendre vos événements exceptionnels.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sophie Martin",
                  role: "CEO & Co-fondatrice",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Thomas Dubois",
                  role: "CTO",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Marie Laurent",
                  role: "Directrice Marketing",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};