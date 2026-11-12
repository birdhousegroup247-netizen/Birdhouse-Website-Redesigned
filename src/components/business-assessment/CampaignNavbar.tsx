import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

const CAMPAIGN_LINKS = [
  { label: 'The challenges', target: 'challenges' },
  { label: 'Our solutions', target: 'solutions' }
];

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CampaignNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const navigateToSection = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-surface-primary text-text-primary backdrop-blur-xl transition-colors duration-300 dark:border-zinc-800 dark:bg-[#090b0c] dark:text-white">

      <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:h-[96px] lg:px-12" aria-label="Business assessment navigation">
        <Link to="/" onClick={() => setMenuOpen(false)} className="shrink-0 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">
          <img src="/images/logo/logo-black.png" alt="Birdhouse Group" className="h-8 w-auto dark:hidden sm:h-9" />
          <img src="/images/logo/logo-white.png" alt="Birdhouse Group" className="hidden h-8 w-auto dark:block sm:h-9" />
        </Link>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {CAMPAIGN_LINKS.map((link) =>
          <a
            key={link.target}
            href={`#${link.target}`}
            onClick={(event) => {
              event.preventDefault();
              navigateToSection(link.target);
            }}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-green focus:outline-none focus-visible:text-brand-green focus-visible:ring-2 focus-visible:ring-emerald-300/70">

              {link.label}
            </a>
          )}
          <ThemeToggle />
          <a
            href="#assessment"
            onClick={(event) => {
              event.preventDefault();
              navigateToSection('assessment');
            }}
            className="rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:bg-[#13a866] dark:hover:bg-emerald-400 lg:px-8">

            Free Assessment
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close campaign menu' : 'Open campaign menu'}
            aria-expanded={menuOpen}
            aria-controls="campaign-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-text-secondary transition-colors hover:bg-surface-tertiary hover:text-text-primary focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen &&
        <motion.div
          id="campaign-mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border-t border-gray-200 bg-surface-secondary px-6 py-6 transition-colors duration-300 dark:border-zinc-800 md:hidden">

          <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
            {CAMPAIGN_LINKS.map((link) =>
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(link.target);
              }}
              className="text-base font-semibold text-text-primary transition-colors hover:text-brand-green focus:outline-none focus-visible:text-brand-green focus-visible:ring-2 focus-visible:ring-emerald-300/70">

                {link.label}
              </a>
            )}
            <a
              href="#assessment"
              onClick={(event) => {
                event.preventDefault();
                navigateToSection('assessment');
              }}
              className="mt-1 inline-flex justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:bg-[#13a866] dark:hover:bg-emerald-400">

              Free Assessment
            </a>
          </div>
        </motion.div>
        }
      </AnimatePresence>
    </motion.header>
  );
}
