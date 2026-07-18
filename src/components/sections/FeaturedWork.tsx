import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PortfolioCard } from '../ui/PortfolioCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
export function FeaturedWork() {
  const navigate = useNavigate();
  return (
    <section className="py-32 max-w-desktop mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between mb-20">
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
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}>
          
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl">
            Digital products and platforms crafted with precision for ambitious
            companies.
          </p>
        </motion.div>
        <Button
          variant="outline"
          icon={ArrowRight}
          onClick={() => navigate('/work')}>
          View All Work
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Large Feature */}
        <div className="lg:col-span-8">
          <PortfolioCard
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            category="Fintech"
            client="Stripe"
            title="Next-generation payment dashboard" />

        </div>

        {/* Offset Smaller Feature */}
        <div className="lg:col-span-4 lg:mt-32">
          <PortfolioCard
            image="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"
            category="Enterprise"
            client="Linear"
            title="Issue tracking for high-performing teams" />

        </div>

        {/* Third Feature */}
        <div className="lg:col-span-6 lg:col-start-2 lg:mt-10">
          <PortfolioCard
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
            category="Healthcare"
            client="Oura"
            title="Health data visualization platform" />
          
        </div>
      </div>
    </section>);

}