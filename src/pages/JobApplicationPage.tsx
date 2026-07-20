import React from 'react';
import { ApplyHero } from '../components/careers/ApplyHero';
import { ApplyForm } from '../components/careers/ApplyForm';
export function JobApplicationPage() {
  return (
    <main className="bg-surface-secondary">
      <ApplyHero />
      <ApplyForm />
    </main>);

}
