import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
export function FinalCTA() {
  return (
    <section id="cta" className="py-32 max-w-desktop mx-auto px-6 md:px-12">
      <motion.div
        className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center"
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        whileInView={{
          opacity: 1,
          scale: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1]
        }}>
        
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Team collaborating around a laptop"
          className="absolute inset-0 w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-brand-green/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-24">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 max-w-2xl leading-tight break-words">
            Ready to build something extraordinary?
          </h2>
          <p className="text-white/80 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-xl leading-relaxed">
            Partner with us to design and develop your next digital product.
            Let's create an experience your users will love.
          </p>
          <Button variant="glass" size="lg" icon={ArrowRight}>
            Get in touch
          </Button>
        </div>
      </motion.div>
    </section>);

}