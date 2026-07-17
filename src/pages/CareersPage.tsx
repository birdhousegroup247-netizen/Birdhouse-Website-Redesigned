import React from 'react';
import { CareersHero } from '../components/careers/CareersHero';
import { CareersJoinSection } from '../components/careers/CareersJoinSection';
import { OpenPositions } from '../components/careers/OpenPositions';
export function CareersPage() {
  return (
    <main className="bg-surface-secondary">
      <CareersHero />
      <CareersJoinSection />
      <OpenPositions />
    </main>);

}
