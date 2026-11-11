import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CampaignBanner() {
  return (
    <section className="px-0 pb-10 sm:px-6 md:px-12 md:pb-16" aria-label="Business assessment promotion">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-desktop">

        <Link
          to="/business-assessment"
          className="block bg-surface-secondary shadow-xl transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/50">

          <img
            src="/images/business-assessment-banner.webp"
            alt="60% off software development plus a free business assessment. Offer ends 24 December 2026."
            width="2508"
            height="1412"
            decoding="async"
            className="block h-auto w-full object-contain" />
        </Link>
      </motion.div>
    </section>
  );
}
