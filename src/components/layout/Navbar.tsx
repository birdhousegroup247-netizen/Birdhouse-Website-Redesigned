import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
const NAV_LINKS = [
{ label: 'Home', to: '/' },
{ label: 'Work', to: '/work' },
{ label: 'Services', to: '/services' },
{ label: 'Products', to: '/products' },
{ label: 'Contact', to: '/contact' }];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  const scrollToCta = () => {
    setMenuOpen(false);
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };
  const isActive = (to: string) =>
  to === '/' ? pathname === '/' : pathname.startsWith(to);
  return (
    <motion.nav
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>

      <div className="max-w-desktop mx-auto px-6 md:px-12">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 md:px-8 py-4 transition-all duration-500 ${scrolled || menuOpen ? 'glass-panel' : 'bg-transparent'}`}>

          <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <img
              src="/images/logo/logo-black.png"
              alt="Birdhouse"
              className="h-8 w-auto dark:hidden" />

            <img
              src="/images/logo/logo-white.png"
              alt="Birdhouse"
              className="h-8 w-auto hidden dark:block" />

          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-secondary">
            {NAV_LINKS.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${isActive(link.to) ? 'text-brand-green' : 'hover:text-text-primary'}`}>

                {link.label}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Button variant="primary" size="sm" onClick={scrollToCta} className="hidden sm:inline-flex">
              Start a Project
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary bg-surface-secondary hover:bg-surface-tertiary transition-colors">

              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen &&
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-panel rounded-2xl mt-2 px-6 py-6 flex flex-col gap-5">

            {NAV_LINKS.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium transition-colors ${isActive(link.to) ? 'text-brand-green' : 'text-text-secondary hover:text-text-primary'}`}>

                {link.label}
              </Link>
            )}
            <Button variant="primary" size="sm" onClick={scrollToCta} className="w-full sm:hidden">
              Start a Project
            </Button>
          </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.nav>);

}
