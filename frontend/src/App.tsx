import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/layout/Navigation';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RegisterClient } from './pages/RegisterClient';
import { RegisterOrganizer } from './pages/RegisterOrganizer';
import { Support } from './pages/Support';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { useScrollLock } from './hooks/useScrollLock';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom hooks
  useScrollLock(isMenuOpen);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AppContent 
                isMenuOpen={isMenuOpen}
                onMenuToggle={handleMenuToggle}
                onMenuClose={handleMenuClose}
              />
              <Toaster
                position="bottom-center"
                toastOptions={{
                  className: 'dark:bg-[#111111] dark:text-white bg-white text-gray-900',
                  duration: 3000,
                  style: {
                    padding: '16px',
                    borderRadius: '12px',
                  },
                }}
              />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

// Separate component to access useLocation
function AppContent({ isMenuOpen, onMenuToggle, onMenuClose }) {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/register/client', '/register/organizer'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {!isAuthPage && (
        <Navigation 
          isMenuOpen={isMenuOpen}
          onMenuToggle={onMenuToggle}
          onMenuItemClick={onMenuClose}
        />
      )}
      <Routes>
        <Route path="/" element={<Home key={location.pathname} />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/client" element={<RegisterClient />} />
        <Route path="/register/organizer" element={<RegisterOrganizer />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;