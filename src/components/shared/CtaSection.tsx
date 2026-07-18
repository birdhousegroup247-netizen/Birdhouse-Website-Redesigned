import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export const CtaSection = () => {
  return (
    <section id="cta" className="py-32 px-6 md:px-12 max-w-desktop mx-auto">
      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true,
          margin: '-100px'
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="bg-surface-900 rounded-[3rem] p-8 sm:p-12 lg:p-20 relative overflow-hidden text-center">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Ready to build something{' '}
            <span className="text-emerald-400">extraordinary?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-surface-300 mb-8 sm:mb-12 leading-relaxed">
            Let's discuss how Birdhouse Group can help transform your business
            with world-class design and engineering.
          </p>

          <button className="group inline-flex items-center gap-2 bg-emerald-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-xl font-bold hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 w-full sm:w-auto justify-center">
            Start a Project
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>);

};