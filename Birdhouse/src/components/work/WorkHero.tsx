import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export const WorkHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-surface-100 rounded-full blur-3xl -z-10 opacity-70"></div>

      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.05] mb-8 text-balance">
          
          Selected Work That Solves{' '}
          <span className="text-emerald-500">Real Business</span> Problems.
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-xl md:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance font-medium">
          
          Explore how Birdhouse Group transforms ideas into intuitive digital
          products, modern websites, and scalable software.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button
            onClick={() =>
            document.getElementById('cta')?.scrollIntoView({
              behavior: 'smooth'
            })
            }
            className="group flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">
            
            Start a Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() =>
            document.getElementById('work')?.scrollIntoView({
              behavior: 'smooth'
            })
            }
            className="px-8 py-4 rounded-full text-lg font-semibold text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-300">
            
            View Case Studies
          </button>
        </motion.div>
      </div>
    </section>);

};