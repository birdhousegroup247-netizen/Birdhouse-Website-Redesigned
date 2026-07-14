import React from 'react';
import { Hero } from '../components/hero/Hero';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { Services } from '../components/sections/Services';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCTA } from '../components/sections/FinalCTA';
export function HomePage() {
  return (
    <main className="bg-surface-primary">
      <Hero />
      <FeaturedWork />
      <Services />
      <Process />
      <Testimonials />
      <FinalCTA />
    </main>);

}
