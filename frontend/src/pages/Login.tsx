import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Facebook, Apple } from 'lucide-react';
import { SEO } from '../components/SEO';
import { login, loginSchema } from '../lib/auth';
import { toast } from 'react-hot-toast';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = loginSchema.parse({ email, password });
      
      setLoading(true);
      const { success } = await login(validatedData.email, validatedData.password);
      
      if (success) {
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Connexion" 
        description="Connectez-vous à votre compte Event Ease pour accéder à vos événements et réservations."
      />
      
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Column - Image */}
          <div 
            className="hidden lg:block relative overflow-hidden"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
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
                  Découvrez et réservez les meilleurs événements. Une expérience unique vous attend.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
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

              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Connexion</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Connectez-vous à votre compte
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 pl-11"
                      placeholder="votre@email.com"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 pl-11"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-[#111111] text-cyan-500 focus:ring-cyan-500/20"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Garder ma session</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-cyan-500 hover:text-cyan-400">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-500 bg-white dark:bg-black">ou</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center p-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center p-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center p-3 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Apple className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Register Link */}
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-cyan-500 hover:text-cyan-400">
                    S'inscrire
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};