import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X, Twitter, Instagram, Linkedin, Mail, Phone, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../lib/auth';

interface NavigationProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuItemClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  onMenuToggle,
  onMenuItemClick,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      navigate('/');
      onMenuItemClick();
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[70] transition-all duration-300 bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/"
              className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={onMenuItemClick}
            >
              <Calendar className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-500" strokeWidth={1.5} />
              <span className="hidden sm:inline">Event Ease</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
                aria-label="Toggle theme"
              >
                <div className="w-10 h-10 absolute inset-0 rounded-full bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 relative z-10" strokeWidth={1.5} />
                ) : (
                  <Moon className="h-5 w-5 relative z-10" strokeWidth={1.5} />
                )}
              </button>

              {/* Burger Menu Button */}
              <button 
                onClick={onMenuToggle}
                className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-cyan-400 transition-colors relative group z-[70]"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-12 h-12 absolute inset-0 rounded-full bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isMenuOpen ? (
                  <X className="h-6 w-6 relative z-10" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6 relative z-10" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Navigation Menu */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background Layers */}
        <div className="fixed inset-0 z-[61]">
          {/* Base Background */}
          <div className="absolute inset-0 bg-white/95 dark:bg-black/95" />

          {/* Animated Gradient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-gradient opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_70%)]" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
                  linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px, 48px 48px, 48px 48px'
              }}
            />
          </div>

          {/* Floating Gradient Orbs */}
          <div className="absolute top-0 -left-48 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-[128px] opacity-20 animate-float" />
          <div className="absolute bottom-0 -right-48 w-96 h-96 bg-blue-500/30 rounded-full filter blur-[128px] opacity-20 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-[160px] opacity-10 animate-pulse" />
        </div>

        {/* Menu Content */}
        <div className="relative z-[62] h-screen max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr,400px] gap-12 overflow-y-auto">
          {/* Left Column - Navigation Links */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Événements', href: '/events' },
                { name: 'Contactez-nous', href: '/support' },
                { name: 'À propos', href: '/about' }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onMenuItemClick}
                  className={`group relative block text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white transition-all duration-300
                    ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 bg-gray-100 dark:bg-white/5 rounded-lg -z-10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div 
              className={`mt-12 flex gap-6
                ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Additional Content */}
          <div 
            className={`lg:border-l lg:border-gray-200 dark:lg:border-white/10 lg:pl-12 flex flex-col justify-center
              ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Auth Buttons */}
            <div className="flex flex-col gap-4 mb-12">
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="w-full px-8 py-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 rounded-full backdrop-blur-sm font-medium transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105"
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={onMenuItemClick}
                    className="w-full px-8 py-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 rounded-full backdrop-blur-sm font-medium transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105"
                  >
                    Se connecter
                  </Link>
                  <Link 
                    to="/register"
                    onClick={onMenuItemClick}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-all duration-300">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
                  <p className="text-lg font-medium">hello@eventease.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-all duration-300">
                  <Phone className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Téléphone</p>
                  <p className="text-lg font-medium">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};