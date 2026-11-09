import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CampaignBanner() {
  return (
    <section className="px-6 pb-10 md:px-12 md:pb-16" aria-label="2027 Business Reset campaign">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-desktop">

        <Link
          to="/business-assessment"
          className="group relative block overflow-hidden rounded-3xl bg-[#101213] px-6 py-8 text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-green/30 sm:px-10 sm:py-10 lg:px-14">

          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-300">
                The 2027 Business Reset
              </p>
              <h2 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Don&apos;t carry this year&apos;s business bottlenecks into the next.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                Find the friction, get a clearer direction, and start 2027 with systems built for growth.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-brand-green px-6 py-4 text-sm font-bold text-white transition-colors group-hover:bg-emerald-400 sm:self-center">
              Get Your Free Business Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
