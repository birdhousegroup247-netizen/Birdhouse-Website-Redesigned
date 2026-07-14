import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ParticleField } from './ParticleField';
import { LaptopMockup } from './LaptopMockup';
const FULL_TEXT = 'Designing Digital Products That Move Businesses Forward.';
export function Hero() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setTypedText(FULL_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField />

      <div className="max-w-desktop mx-auto px-12 relative z-10 w-full">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="col-span-12 lg:col-span-6 pr-0 lg:pr-12">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-balance text-text-primary min-h-[160px] lg:min-h-[240px]">
                {typedText}
                <span
                  className={`inline-block w-1 h-[1em] bg-brand-green ml-2 align-middle transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                
              </h1>

              <motion.p
                className="text-xl text-text-secondary leading-relaxed max-w-xl mb-12"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.5
                }}>
                
                We bring order to digital complexity through product design,
                modern websites, and scalable software.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-6"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.8
                }}>
                
                <Button
                  size="lg"
                  onClick={() =>
                  document.getElementById('cta')?.scrollIntoView({
                    behavior: 'smooth'
                  })
                  }>
                  Start a Project
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => navigate('/work')}>
                  View Our Work
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Laptop Mockup */}
          <div className="col-span-12 lg:col-span-6 mt-16 lg:mt-0">
            <LaptopMockup />
          </div>
        </div>
      </div>
    </section>);

}