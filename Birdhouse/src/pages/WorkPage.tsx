import React from 'react';
import { WorkHero } from '../components/work/WorkHero';
import { ProjectOne } from '../components/work/ProjectOne';
import { ProjectTwo } from '../components/work/ProjectTwo';
import { ProjectThree } from '../components/work/ProjectThree';
import { CtaSection } from '../components/shared/CtaSection';
export function WorkPage() {
  return (
    <main className="bg-[#FAFAFA]">
      <WorkHero />
      <ProjectOne />
      <ProjectTwo />
      <ProjectThree />
      <CtaSection />
    </main>);

}
