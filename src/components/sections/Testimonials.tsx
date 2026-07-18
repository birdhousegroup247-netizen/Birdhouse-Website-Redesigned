import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from '../ui/TestimonialCard';
export function Testimonials() {
  return (
    <section className="py-32 bg-surface-secondary overflow-hidden">
      <div className="max-w-desktop mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-24"
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
            Client Stories
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the teams we've partnered
            with.
          </p>
        </motion.div>

        <div className="relative">
          {/* Staggered Layout */}
          <div className="grid grid-cols-12 gap-8">
            <motion.div
              className="col-span-6 lg:col-span-5"
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              <TestimonialCard
                quote="Birdhouse transformed our complex enterprise software into an intuitive, beautiful experience. Their attention to detail is unmatched."
                author="Sarah Jenkins"
                role="VP of Product"
                company="TechFlow"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" />
              
            </motion.div>

            <motion.div
              className="col-span-6 lg:col-span-5 lg:col-start-7 mt-24"
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              <TestimonialCard
                quote="The team at Birdhouse doesn't just design screens; they think deeply about the business problem. A true partner."
                author="David Chen"
                role="Founder & CEO"
                company="Nexus"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" />
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}