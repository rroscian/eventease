import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { toast } from 'react-hot-toast';

export const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    organization: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    acceptTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast.error('Veuillez accepter les conditions générales');
      return;
    }

    // Here you would typically send the form data to your backend
    toast.success('Message envoyé avec succès');
    setFormData({
      organization: '',
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      acceptTerms: false
    });
  };

  return (
    <>
      <SEO 
        title="Support" 
        description="Contactez notre équipe de support pour toute question ou assistance."
      />

      <div className="min-h-screen bg-white dark:bg-black pt-20">
        {/* Hero Section */}
        <div className="relative h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
            <h1 className="text-7xl font-bold text-gray-900 dark:text-white">
              Support<span className="text-cyan-500">.</span>
            </h1>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-24">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contactez-Nous</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Nous attachons une grande importance à vos demandes et nous nous efforçons d'être à votre écoute. Remplissez le formulaire ci-dessous pour nous envoyer votre message. Nous reviendrons vers vous sous 24h à 48h heures.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">support@eventease.com</p>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Téléphone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Adresse</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom de l'organisation
                </label>
                <input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Votre organisation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-[#111111] text-cyan-500 focus:ring-cyan-500/20"
                    required
                  />
                </div>
                <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Je reconnais les{' '}
                  <a href="/terms" className="text-cyan-500 hover:text-cyan-400">
                    conditions générales de service et d'utilisation
                  </a>
                </label>
              </div>

              <button type="submit" className="w-full btn-primary">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};