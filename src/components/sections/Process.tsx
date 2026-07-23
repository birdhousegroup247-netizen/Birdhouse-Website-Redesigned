import React from 'react';
import { motion } from 'framer-motion';
const STEPS = [
{
  num: '01',
  title: 'Discover',
  desc: 'We dive deep into your business goals, user needs, and technical constraints to define a clear product strategy.',
  img: '/images/birdhouse-team.webp'
},
{
  num: '02',
  title: 'Design',
  desc: 'Our team crafts intuitive interfaces and cohesive design systems that elevate your brand and engage your users.',
  img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop'
},
{
  num: '03',
  title: 'Build',
  desc: 'We develop scalable, performant software using modern technologies, ensuring a seamless experience across all devices.',
  img: '/images/birdhouse-systems.webp'
}];

export function Process() {
  return (
    <section className="py-32 max-w-desktop mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Sticky Left Side */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-40">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
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
              
              How We Work
            </motion.h2>
            <motion.p
              className="text-xl text-text-secondary"
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
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              A proven methodology for delivering exceptional digital products,
              from concept to launch.
            </motion.p>
          </div>
        </div>

        {/* Scrolling Right Side */}
        <div className="lg:col-span-7 space-y-20 lg:space-y-32">
          {STEPS.map((step, idx) =>
          <motion.div
            key={step.num}
            className="flex flex-col gap-8"
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
            }}>
            
              <div className="flex items-baseline gap-6">
                <span className="text-6xl font-bold text-brand-green/20">
                  {step.num}
                </span>
                <h3 className="text-3xl font-bold">{step.title}</h3>
              </div>
              <p className="text-xl text-text-secondary leading-relaxed">
                {step.desc}
              </p>
              <div className="rounded-3xl overflow-hidden aspect-[16/9]">
                <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover" />
              
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}