import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import { Network } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <span className="text-forest-green text-3xl">
            <Network size={36} />
          </span>
          <div>
            <h1 className="font-heading font-bold text-forest-green text-xl md:text-2xl">
              {SITE_NAME}
            </h1>
            <p className="text-xs text-leaf-green font-medium">{SITE_TAGLINE}</p>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-stone-gray focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`font-heading font-medium transition-colors ${
                location === link.path 
                  ? 'text-forest-green' 
                  : 'hover:text-forest-green'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="px-4 py-3 bg-off-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`font-heading font-medium transition-colors ${
                    location === link.path 
                      ? 'text-forest-green' 
                      : 'hover:text-forest-green'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
