import React from 'react';
import { motion } from 'framer-motion';
import { DesktopMockup, TabletMockup, MobileMockup } from '../shared/Mockups';
export const ProjectTwo = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-desktop mx-auto">
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
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
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1]
          }}>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
              Enterprise SaaS
            </span>
            <span className="w-8 h-[1px] bg-surface-300"></span>
            <span className="text-surface-500 dark:text-surface-400 font-medium text-sm">2024</span>
          </div>

          <h2 className="text-5xl font-extrabold text-surface-900 dark:text-white mb-6 leading-tight">
            Nexus Workspace
          </h2>
          <p className="text-xl text-surface-500 dark:text-surface-400 leading-relaxed">
            A unified collaboration platform designed to break down silos in
            enterprise teams. We delivered a scalable design system and a
            seamless cross-device experience.
          </p>
        </motion.div>
      </div>

      {/* Overlapping Mockups Layout */}
      <div className="relative h-[420px] sm:h-[560px] lg:h-[900px] w-full bg-surface-900 rounded-[3rem] overflow-hidden flex items-center justify-center group">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-900/40 rounded-full blur-[120px] opacity-50"></div>
        </div>

        {/* Tablet - Left */}
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
            rotate: -5
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            rotate: -2
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute left-[5%] top-[20%] w-[210px] sm:w-[280px] lg:w-[450px] z-10 transition-transform duration-700 group-hover:-translate-x-4 group-hover:-rotate-4">
          
          <TabletMockup
            className="h-[280px] sm:h-[375px] lg:h-[600px] shadow-2xl border-surface-800"
            type="dashboard" />
          
        </motion.div>

        {/* Mobile - Right */}
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
            rotate: 5
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            rotate: 2
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute right-[10%] bottom-[15%] w-[130px] sm:w-[170px] lg:w-[280px] z-30 transition-transform duration-700 group-hover:translate-x-4 group-hover:rotate-4">
          
          <MobileMockup
            className="h-[270px] sm:h-[350px] lg:h-[580px] shadow-2xl border-surface-800"
            type="app" />
          
        </motion.div>

        {/* Desktop - Center */}
        <motion.div
          initial={{
            opacity: 0,
            y: 100
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
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[420px] sm:w-[560px] lg:w-[900px] z-20 transition-transform duration-700 group-hover:-translate-y-4">
          
          <DesktopMockup
            className="h-[280px] sm:h-[375px] lg:h-[600px] shadow-2xl border-surface-800"
            type="dashboard" />
          
        </motion.div>
      </div>

      {/* Details Below */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 mt-16 sm:mt-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5
          }}>
          
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-3">
            The Challenge
          </h3>
          <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
            Fragmented tools caused context switching and lost productivity for
            enterprise teams scaling beyond 500 employees.
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5,
            delay: 0.1
          }}>
          
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-3">
            The Solution
          </h3>
          <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
            A centralized workspace integrating chat, project management, and
            analytics into a single, lightning-fast interface.
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5,
            delay: 0.2
          }}>
          
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'Zustand', 'Radix UI', 'WebSockets'].map((tech) =>
            <span
              key={tech}
              className="px-3 py-1 bg-surface-100 text-surface-600 rounded-full text-xs font-semibold">
              
                {tech}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};