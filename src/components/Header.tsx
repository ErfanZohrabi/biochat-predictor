
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
        isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          <div className="h-10 w-10 rounded-xl bg-bioez-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-2xl">BioEZ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="bg-bioez-gradient hover:opacity-90 transition-opacity text-white font-medium px-6"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass animate-fadeIn py-6 px-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-base font-medium py-2 px-3 rounded-md transition-colors',
                  isActive(link.path) 
                    ? 'bg-bioez-100 text-bioez-600' 
                    : 'hover:bg-bioez-50 hover:text-bioez-500'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="bg-bioez-gradient hover:opacity-90 transition-opacity text-white font-medium w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
