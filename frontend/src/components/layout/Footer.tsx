import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link 
              to="/"
              className="text-white text-xl font-bold flex items-center gap-2 mb-4 hover:scale-105 transition-transform"
            >
              <Calendar className="h-6 w-6 text-cyan-400" strokeWidth={1.5} />
              <span>Event Ease</span>
            </Link>
            <p className="text-sm">
              Votre plateforme de réservation d'événements de confiance.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Événements</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="hover:text-white transition-colors duration-300">
                  Tous les événements
                </Link>
              </li>
              <li>
                <Link to="/events?category=Concerts" className="hover:text-white transition-colors duration-300">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/events?category=Sports" className="hover:text-white transition-colors duration-300">
                  Sports
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-white transition-colors duration-300">
                  L'équipe
                </Link>
              </li>
              <li>
                <Link to="/about#careers" className="hover:text-white transition-colors duration-300">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          © 2025 Event Ease. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};