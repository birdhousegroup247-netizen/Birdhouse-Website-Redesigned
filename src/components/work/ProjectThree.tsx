import React from 'react';
import { motion } from 'framer-motion';
import { DesktopMockup, MobileMockup } from '../shared/Mockups';
export const ProjectThree = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-desktop mx-auto">
      <div className="mb-16">
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
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
              E-Commerce / Lifestyle
            </span>
            <span className="w-8 h-[1px] bg-surface-300"></span>
            <span className="text-surface-500 dark:text-surface-400 font-medium text-sm">2023</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 dark:text-white leading-tight max-w-2xl">
              Aura Lifestyle
            </h2>
            <div className="flex flex-wrap gap-2 max-w-sm sm:justify-end">
              {['Shopify Plus', 'Hydrogen', 'Tailwind CSS', 'Sanity CMS'].map(
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

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6 lg:h-[900px]">
        {/* Main Desktop Feature - Top Left */}
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
          }}
          className="lg:col-span-8 lg:row-span-1 lg:h-auto bg-surface-100 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group flex flex-col lg:block">

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 w-full lg:w-2/3">
            <h3 className="text-2xl font-bold text-surface-900 mb-3">
              Immersive Shopping Experience
            </h3>
            <p className="text-surface-500">
              We built a headless storefront that loads in under 1.2 seconds,
              featuring cinematic product videos and seamless transitions.
            </p>
          </div>
          <div className="relative mt-6 mx-auto w-full max-w-[240px] lg:mt-0 lg:mx-0 lg:absolute lg:right-[-5%] lg:bottom-[-20%] lg:w-[600px] lg:max-w-none transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
            <DesktopMockup className="h-[160px] sm:h-[200px] lg:h-[400px] shadow-xl" type="marketing" />
          </div>
        </motion.div>

        {/* Mobile Feature - Top Right */}
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
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="lg:col-span-4 lg:row-span-2 lg:h-auto bg-emerald-900 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group text-white flex flex-col lg:block">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700 via-emerald-900 to-emerald-950"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white">Mobile-First Conversion</h3>
            <p className="text-emerald-100/80 mb-8">
              Optimized checkout flow resulting in a 34% increase in mobile
              conversion rate.
            </p>
          </div>
          <div className="relative z-10 mt-2 mx-auto w-full max-w-[150px] lg:mt-0 lg:mx-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[-10%] lg:w-[260px] lg:max-w-none transition-transform duration-700 group-hover:-translate-y-6">
            <MobileMockup
              className="h-[210px] sm:h-[270px] lg:h-[550px] shadow-2xl border-surface-800"
              type="marketing" />

          </div>
        </motion.div>

        {/* Outcomes - Bottom Left */}
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
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="lg:col-span-4 lg:row-span-1 bg-white border border-surface-200 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-center group hover:border-emerald-200 transition-colors duration-300">
          
          <h3 className="text-sm font-bold text-surface-400 uppercase tracking-wider mb-8">
            Key Outcomes
          </h3>
          <div className="space-y-8">
            <div>
              <div className="text-4xl font-extrabold text-emerald-500 mb-2">
                1.2s
              </div>
              <div className="text-surface-600 font-medium">
                Average Page Load Time
              </div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-emerald-500 mb-2">
                +34%
              </div>
              <div className="text-surface-600 font-medium">
                Mobile Conversion Rate
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solution Text - Bottom Middle */}
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
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="lg:col-span-4 lg:row-span-1 bg-surface-50 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-center">
          
          <h3 className="text-xl font-bold text-surface-900 mb-4">
            The Solution
          </h3>
          <p className="text-surface-500 leading-relaxed">
            By migrating from a monolithic architecture to a headless setup
            using Shopify Plus and Sanity CMS, we empowered the marketing team
            to build rich editorial pages without developer intervention, while
            drastically improving performance.
          </p>
        </motion.div>
      </div>
    </section>);

};