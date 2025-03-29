import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first link when menu opens
      const firstLink = mobileMenuRef.current?.querySelector('a');
      firstLink?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'Database Search', path: '/database-search' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
        isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-[1.02]"
          aria-label="BioEZ Home"
        >
          <div className="h-10 w-10 rounded-xl bg-bioez-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-2xl">BioEZ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-base font-medium transition-colors relative py-2 px-1',
                isActive(link.path) 
                  ? 'text-bioez-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-bioez-500 after:rounded-full' 
                  : 'text-foreground/80 hover:text-bioez-500'
              )}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="bg-bioez-gradient hover:opacity-90 transition-opacity text-white font-medium px-6"
            aria-label="Get Started"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          ref={menuButtonRef}
          className="md:hidden text-foreground p-2" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        id="mobile-menu"
        className={cn(
          "absolute top-full left-0 right-0 glass animate-fadeIn py-6 px-6 md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-base font-medium py-2 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-bioez-500',
                isActive(link.path) 
                  ? 'bg-bioez-100 text-bioez-600' 
                  : 'hover:bg-bioez-50 hover:text-bioez-500'
              )}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="bg-bioez-gradient hover:opacity-90 transition-opacity text-white font-medium w-full mt-2 focus:outline-none focus:ring-2 focus:ring-bioez-500"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Get Started"
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
