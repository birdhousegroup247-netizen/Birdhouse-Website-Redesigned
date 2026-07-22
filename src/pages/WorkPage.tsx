import React from 'react';
import { WorkHero } from '../components/work/WorkHero';
import { ProjectCase } from '../components/work/ProjectCase';
import { CtaSection } from '../components/shared/CtaSection';
import { PROJECTS } from '../data/projects';
export function WorkPage() {
  return (
    <main className="bg-surface-secondary">
      <WorkHero />
      {PROJECTS.map((project, i) =>
      <ProjectCase key={project.slug} project={project} reverse={i % 2 === 1} />
      )}
      <CtaSection />
    </main>);

}
