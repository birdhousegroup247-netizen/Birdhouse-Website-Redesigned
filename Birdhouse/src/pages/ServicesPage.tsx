import React from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesList } from '../components/services/ServicesList';
import { ServicesProcess } from '../components/services/ServicesProcess';
import { CtaSection } from '../components/shared/CtaSection';
export function ServicesPage() {
  return (
    <main className="bg-surface-secondary">
      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <CtaSection />
    </main>);

}
