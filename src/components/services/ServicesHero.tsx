import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BarChart3, Activity } from 'lucide-react';
import { DesktopMockup, MobileMockup } from '../shared/Mockups';
export const ServicesHero = () => {
  return (
    <section className="relative pb-32 px-6 md:px-12 max-w-desktop mx-auto overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

      <div className="min-h-[70vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center z-10 pt-28 sm:pt-32 pb-16 sm:pb-20">
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
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.05] mb-8 text-balance max-w-5xl">

          We Build Digital Experiences That Help{' '}
          <span className="text-emerald-500">Businesses Grow.</span>
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
          className="text-base sm:text-xl md:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance font-medium">

          From strategy and consulting to product design and software
          development, we partner with ambitious businesses to transform ideas
          into intuitive, scalable digital products.
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

          <button
            onClick={() =>
            document.getElementById('cta')?.scrollIntoView({
              behavior: 'smooth'
            })
            }
            className="group flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">

            Start a Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() =>
            document.getElementById('cta')?.scrollIntoView({
              behavior: 'smooth'
            })
            }
            className="group flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap bg-white dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">

            <Calendar className="w-5 h-5" />
            Book a Consultation
          </button>
        </motion.div>
      </div>

      {/* Layered Product Mockups & Floating Glass Panels */}
      <motion.div
        initial={{
          opacity: 0,
          y: 100
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative h-[320px] sm:h-[460px] lg:h-[700px] w-full overflow-hidden flex justify-center items-start mt-12 lg:mt-20">

        <div className="absolute top-0 w-[300px] sm:w-[440px] lg:w-[1000px] z-10">
          <DesktopMockup
            className="h-[180px] sm:h-[265px] lg:h-[600px] shadow-2xl border-surface-200"
            type="dashboard" />
          
        </div>

        <motion.div
          initial={{
            y: 0
          }}
          animate={{
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute left-[15%] top-[20%] w-[110px] sm:w-[165px] lg:w-[280px] z-20">

          <MobileMockup
            className="h-[200px] sm:h-[300px] lg:h-[500px] shadow-2xl border-surface-200"
            type="app" />
          
        </motion.div>

        {/* Floating Glass UI Panel 1 */}
        <motion.div
          initial={{
            y: 0
          }}
          animate={{
            y: [10, -10, 10]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute right-[18%] top-[15%] z-30 glass-panel p-6 rounded-2xl w-64 flex flex-col gap-4">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-surface-900 dark:text-white">
                Growth Rate
              </div>
              <div className="text-xs text-surface-500 dark:text-surface-400">Last 30 days</div>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-500">+124%</div>
          <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-emerald-500 rounded-full"></div>
          </div>
        </motion.div>

        {/* Floating Glass UI Panel 2 */}
        <motion.div
          initial={{
            y: 0
          }}
          animate={{
            y: [-8, 8, -8]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute left-[28%] bottom-[15%] z-30 glass-panel p-5 rounded-2xl w-56 flex items-center gap-4">
          
          <div className="w-12 h-12 rounded-full bg-surface-900 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-surface-400 dark:text-surface-300 uppercase tracking-wider">
              System Status
            </div>
            <div className="text-lg font-extrabold text-surface-900 dark:text-white">
              Optimized
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>);

};