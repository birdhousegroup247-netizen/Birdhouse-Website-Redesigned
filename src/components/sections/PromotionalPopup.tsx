import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const SESSION_KEY = 'birdhouse-promotional-popup-seen';
const SHOW_DELAY_MS = 1500;

function hasSeenPopup() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

function rememberPopup() {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    // The popup can still be dismissed when session storage is unavailable.
  }
}

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasSeenPopup()) return;

    const timeoutId = window.setTimeout(() => {
      rememberPopup();
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        rememberPopup();
        setIsOpen(false);
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const handleClose = () => {
    rememberPopup();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-900/75 p-4 backdrop-blur-sm overscroll-contain">

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Birdhouse business management promotion">

            <img
              src="/images/Smarter Business, Simplified-pop-up.png"
              alt="Still running your business from your DMs? Birdhouse has a smarter way to simplify orders, payments, and customer details."
              className="block h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-full object-contain" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close promotion"
              className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-900/85 text-white shadow-lg transition-colors hover:bg-surface-900 focus:outline-none focus:ring-4 focus:ring-white/70">

              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);
}
