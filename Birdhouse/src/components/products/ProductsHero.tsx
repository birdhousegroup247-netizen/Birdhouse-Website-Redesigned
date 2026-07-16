import React from 'react';
import { motion } from 'framer-motion';

export const ProductsHero = () => {
  return (
    <section className="relative pt-32 pb-16 px-12 max-w-desktop mx-auto overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

      <div className="flex flex-col items-center text-center z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Our Products
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.05] mb-6 text-balance">

          Tools We've Built{' '}
          <span className="text-emerald-500">To Power Growth.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed text-balance font-medium">

          Beyond client work, we build our own software to solve problems
          we've seen again and again.
        </motion.p>
      </div>
    </section>);

};
