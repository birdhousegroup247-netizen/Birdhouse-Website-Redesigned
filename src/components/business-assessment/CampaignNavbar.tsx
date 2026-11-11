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
      className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-[#090b0c]/95 text-white backdrop-blur-xl">

      <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:h-[96px] lg:px-12" aria-label="Business assessment navigation">
        <Link to="/" onClick={() => setMenuOpen(false)} className="shrink-0 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">
          <img src="/images/logo/logo-white.png" alt="Birdhouse Group" className="h-8 w-auto sm:h-9" />
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
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300/70">

              {link.label}
            </a>
          )}
          <ThemeToggle className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white" />
          <a
            href="#assessment"
            onClick={(event) => {
              event.preventDefault();
              navigateToSection('assessment');
            }}
            className="rounded-full bg-[#13a866] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/30 lg:px-8">

            Free Assessment
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white" />
          <button
            type="button"
            aria-label={menuOpen ? 'Close campaign menu' : 'Open campaign menu'}
            aria-expanded={menuOpen}
            aria-controls="campaign-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

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
          className="border-t border-zinc-800 bg-[#111315] px-6 py-6 md:hidden">

          <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
            {CAMPAIGN_LINKS.map((link) =>
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(link.target);
              }}
              className="text-base font-semibold text-zinc-200 transition-colors hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/70">

                {link.label}
              </a>
            )}
            <a
              href="#assessment"
              onClick={(event) => {
                event.preventDefault();
                navigateToSection('assessment');
              }}
              className="mt-1 inline-flex justify-center rounded-full bg-[#13a866] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

              Free Assessment
            </a>
          </div>
        </motion.div>
        }
      </AnimatePresence>
    </motion.header>
  );
}
