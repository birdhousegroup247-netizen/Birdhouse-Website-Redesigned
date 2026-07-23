import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PortfolioCard } from '../ui/PortfolioCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { PROJECTS } from '../../data/projects';

const FEATURED_SLUGS = ['britelite-innovations', 'amanda-malls', 'nexus-ai-summit'];
const [featuredLarge, featuredSmall, featuredThird] = FEATURED_SLUGS.map(
  (slug) => PROJECTS.find((p) => p.slug === slug)!
);

export function FeaturedWork() {
  const navigate = useNavigate();
  return (
    <section className="py-32 max-w-desktop mx-auto px-6 md:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14 sm:mb-20">
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
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
          onClick={() => navigate('/work')}
          className="self-start whitespace-nowrap">
          View All Work
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Large Feature */}
        <div className="lg:col-span-8">
          <PortfolioCard
            image={featuredLarge.images[0]}
            category={featuredLarge.category}
            client={featuredLarge.client}
            title={featuredLarge.title}
            to={`/work#${featuredLarge.slug}`} />

        </div>

        {/* Offset Smaller Feature */}
        <div className="lg:col-span-4 lg:mt-32">
          <PortfolioCard
            image={featuredSmall.images[0]}
            category={featuredSmall.category}
            client={featuredSmall.client}
            title={featuredSmall.title}
            to={`/work#${featuredSmall.slug}`} />

        </div>

        {/* Third Feature */}
        <div className="lg:col-span-6 lg:col-start-2 lg:mt-10">
          <PortfolioCard
            image={featuredThird.images[0]}
            category={featuredThird.category}
            client={featuredThird.client}
            title={featuredThird.title}
            to={`/work#${featuredThird.slug}`} />

        </div>
      </div>
    </section>);

}