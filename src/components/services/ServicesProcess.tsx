import React from 'react';
import { motion } from 'framer-motion';
const steps = [
{
  number: '01',
  title: 'Discovery & Strategy',
  description:
  'We dive deep into your business objectives, market landscape, and user needs to define a clear, actionable roadmap.',
  deliverables: [
  'Product Roadmap',
  'Technical Architecture',
  'User Personas']

},
{
  number: '02',
  title: 'Design & Prototyping',
  description:
  'Our design team crafts intuitive, accessible, and visually stunning interfaces, validating concepts through rapid prototyping.',
  deliverables: ['Wireframes', 'High-Fidelity UI', 'Interactive Prototypes']
},
{
  number: '03',
  title: 'Development & Testing',
  description:
  'Engineering builds robust, scalable software using modern tech stacks, ensuring quality through rigorous automated and manual testing.',
  deliverables: ['Production Code', 'API Documentation', 'QA Reports']
},
{
  number: '04',
  title: 'Delivery & Optimization',
  description:
  'We ensure a smooth launch and continue to monitor, analyze, and optimize the product to drive sustained growth.',
  deliverables: ['Deployment', 'Analytics Setup', 'Growth Strategy']
}];

export const ServicesProcess = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-desktop mx-auto border-t border-surface-200">
      <div className="flex flex-col items-center text-center mb-20">
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Our Collaborative Process
          </h2>
          <p className="text-base sm:text-xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
            A transparent, iterative approach designed to minimize risk and
            deliver exceptional results on time and on budget.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 gap-y-14 relative">
        {/* Connecting Line */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-surface-200 -z-10"></div>

        {steps.map((step, index) =>
        <motion.div
          key={index}
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
            margin: '-50px'
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col">
          
            <div className="w-24 h-24 rounded-full bg-white border-4 border-surface-100 flex items-center justify-center text-2xl font-extrabold text-emerald-500 mb-8 mx-auto shadow-sm relative">
              {step.number}
              {/* Active Dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>

            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 text-center">
              {step.title}
            </h3>
            <p className="text-surface-500 dark:text-surface-400 leading-relaxed text-center mb-8">
              {step.description}
            </p>

            <div className="bg-surface-50 rounded-2xl p-6 mt-auto border border-surface-100">
              <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-4">
                Expected Deliverables
              </h4>
              <ul className="space-y-3">
                {step.deliverables.map((item, i) =>
              <li
                key={i}
                className="flex items-center gap-2 text-sm font-medium text-surface-700">
                
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    {item}
                  </li>
              )}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </section>);

};