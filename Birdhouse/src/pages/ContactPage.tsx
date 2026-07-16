import React from 'react';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactForm } from '../components/contact/ContactForm';
export function ContactPage() {
  return (
    <main className="bg-surface-secondary">
      <ContactHero />
      <ContactForm />
    </main>);

}
