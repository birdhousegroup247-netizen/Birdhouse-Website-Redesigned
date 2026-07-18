import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CareersHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-70"></div>

      <div className="max-w-3xl mx-auto text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.05] mb-6 text-balance">

          Careers at{' '}
          <span className="text-emerald-500">Birdhouse.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance font-medium">

          Join Birdhouse and help us build category-defining digital
          products for ambitious businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>

          <button
            onClick={() =>
            document.getElementById('open-positions')?.scrollIntoView({
              behavior: 'smooth'
            })
            }
            className="group inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">

            See Job Openings
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>);

};
