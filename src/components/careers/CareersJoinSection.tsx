import React from 'react';
import { motion } from 'framer-motion';

export const CareersJoinSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src="/images/careers-hero-1.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-6">

          Work at Birdhouse
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-400 to-white">

          Join a team that builds the work that matters.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">

          See our open roles and discover what it's like to design and
          build products at Birdhouse.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={() =>
          document.getElementById('open-positions')?.scrollIntoView({
            behavior: 'smooth'
          })
          }
          className="bg-white text-surface-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:-translate-y-0.5">

          Learn About Life at Birdhouse
        </motion.button>
      </div>
    </section>);

};
