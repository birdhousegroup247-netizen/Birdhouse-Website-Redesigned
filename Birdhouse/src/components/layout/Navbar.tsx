import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToCta = () => {
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

      <div className="max-w-desktop mx-auto px-12">
        <div
          className={`flex items-center justify-between rounded-2xl px-8 py-4 transition-all duration-500 ${scrolled ? 'glass-panel' : 'bg-transparent'}`}>

          <Link to="/" className="flex items-center">
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

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="primary" size="sm" onClick={scrollToCta}>
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>);

}
