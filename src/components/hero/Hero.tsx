import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ParticleField } from './ParticleField';
import { ProjectInquiryBox } from './ProjectInquiryBox';
const FULL_TEXT = 'Designing Digital\nProducts That\nMove Businesses\nForward.';
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
    <section className="relative min-h-[70vh] sm:min-h-screen flex items-center pt-36 sm:pt-24 pb-10 overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField />

      <div className="max-w-desktop mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
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

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6 whitespace-pre-line text-text-primary min-h-[160px] sm:min-h-[210px] lg:min-h-[320px]">
            {typedText}
            <span
              className={`inline-block w-1 h-[1em] bg-brand-green ml-2 align-middle transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />

          </h1>

          <motion.p
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mb-6"
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

          <ProjectInquiryBox />

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
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

            <Button size="lg" onClick={() => navigate('/get-started')}>
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
    </section>);

}