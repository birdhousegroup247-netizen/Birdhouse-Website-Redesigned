import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Code2, Database, LayoutTemplate } from 'lucide-react';
export function Services() {
  return (
    <section className="py-32 bg-surface-secondary">
      <div className="max-w-desktop mx-auto px-6 md:px-12">
        <motion.div
          className="mb-20"
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
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}>
          
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            Our Expertise
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl">
            We combine strategic thinking with world-class execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-[240px]">
          {/* Large Tile */}
          <motion.div
            className="sm:col-span-2 lg:row-span-2 bg-white dark:bg-surface-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-gray-100 dark:border-surface-700 shadow-sm"
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
              duration: 0.8,
              delay: 0.1
            }}>
            
            <div className="w-14 h-14 rounded-2xl bg-brand-greenLight flex items-center justify-center">
              <PenTool className="w-7 h-7 text-brand-green" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Product Design</h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                We design intuitive, beautiful interfaces that solve complex
                problems and delight users. From wireframes to high-fidelity
                prototypes.
              </p>
            </div>
          </motion.div>

          {/* Medium Tile */}
          <motion.div
            className="sm:col-span-2 bg-brand-green rounded-3xl p-8 flex flex-col justify-between text-white shadow-lg shadow-brand-green/20"
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
              duration: 0.8,
              delay: 0.2
            }}>
            
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Web Development</h3>
              <p className="text-white/80">
                Modern, performant web applications built with React and
                Next.js.
              </p>
            </div>
          </motion.div>

          {/* Small Tile 1 */}
          <motion.div
            className="col-span-1 row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-between"
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
              duration: 0.8,
              delay: 0.3
            }}>
            
            <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center">
              <Database className="w-6 h-6 text-text-primary" />
            </div>
            <h3 className="text-xl font-bold">Scalable Software</h3>
          </motion.div>

          {/* Small Tile 2 */}
          <motion.div
            className="col-span-1 row-span-1 bg-white dark:bg-surface-800 rounded-3xl p-8 flex flex-col justify-between border border-gray-100 dark:border-surface-700 shadow-sm"
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
              duration: 0.8,
              delay: 0.4
            }}>
            
            <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center">
              <LayoutTemplate className="w-6 h-6 text-text-primary" />
            </div>
            <h3 className="text-xl font-bold">Design Systems</h3>
          </motion.div>
        </div>
      </div>
    </section>);

}