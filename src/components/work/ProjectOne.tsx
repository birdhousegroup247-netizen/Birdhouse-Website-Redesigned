import React from 'react';
import { motion } from 'framer-motion';
import { DesktopMockup, MobileMockup } from '../shared/Mockups';
export const ProjectOne = () => {
  return (
    <section id="work" className="py-32 px-6 md:px-12 max-w-desktop mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Content - Left Side */}
        <div className="lg:col-span-5 flex flex-col justify-center">
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
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1]
            }}>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
                Fintech
              </span>
              <span className="w-8 h-[1px] bg-surface-300"></span>
              <span className="text-surface-500 dark:text-surface-400 font-medium text-sm">2023</span>
            </div>

            <h2 className="text-5xl font-extrabold text-surface-900 dark:text-white mb-8 leading-tight">
              PayFlow Pro
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                  The Challenge
                </h3>
                <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                  Legacy financial dashboards were overwhelming users with dense
                  data, leading to high support tickets and low feature adoption
                  among small business owners.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                  The Solution
                </h3>
                <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                  We redesigned the core platform with a focus on progressive
                  disclosure, introducing a modular dashboard that surfaces
                  critical insights while keeping complex tools accessible but
                  hidden.
                </p>
              </div>

              <div className="pt-6 border-t border-surface-200">
                <h3 className="text-sm font-bold text-surface-400 dark:text-surface-300 uppercase tracking-wider mb-4">
                  Key Outcomes
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-extrabold text-emerald-500 mb-1">
                      -42%
                    </div>
                    <div className="text-sm font-medium text-surface-600 dark:text-surface-300">
                      Support Tickets
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-emerald-500 mb-1">
                      +85%
                    </div>
                    <div className="text-sm font-medium text-surface-600 dark:text-surface-300">
                      Feature Adoption
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map(
                  (tech) =>
                  <span
                    key={tech}
                    className="px-3 py-1 bg-surface-100 text-surface-600 rounded-full text-xs font-semibold">
                    
                      {tech}
                    </span>

                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visuals - Right Side (Split Screen) */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[800px] bg-surface-100 rounded-[2.5rem] overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-surface-100 opacity-50"></div>

          <motion.div
            initial={{
              opacity: 0,
              x: 100
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute right-[-10%] top-[15%] w-[360px] sm:w-[460px] lg:w-[800px] z-10 transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-[1.02]">
            
            <DesktopMockup className="h-[220px] sm:h-[290px] lg:h-[500px] shadow-2xl" type="dashboard" />
          </motion.div>

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
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute left-[10%] bottom-[10%] w-[130px] sm:w-[170px] lg:w-[280px] z-20 transition-transform duration-700 group-hover:-translate-y-8 group-hover:scale-[1.05]">
            
            <MobileMockup className="h-[270px] sm:h-[350px] lg:h-[580px] shadow-2xl" type="app" />
          </motion.div>
        </div>
      </div>
    </section>);

};