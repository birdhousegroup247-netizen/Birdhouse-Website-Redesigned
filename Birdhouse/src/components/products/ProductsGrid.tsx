import React from 'react';
import { BarChart3, Workflow, ShieldCheck, Rocket } from 'lucide-react';
import { ProductCard } from '../ui/ProductCard';

const PRODUCTS = [
{
  icon: BarChart3,
  name: 'Pulse Analytics',
  status: 'Live',
  description:
  'A lightweight, privacy-first analytics dashboard that gives product teams real-time insight without the bloat.',
  accent: 'bg-emerald-500'
},
{
  icon: Workflow,
  name: 'Flowstack',
  status: 'Live',
  description:
  'Visual workflow automation for internal ops teams — connect your tools and ship approvals in minutes, not days.',
  accent: 'bg-surface-900'
},
{
  icon: ShieldCheck,
  name: 'Vault',
  status: 'Beta',
  description:
  'A secure, audit-ready credential and secrets manager built for small engineering teams that outgrew spreadsheets.',
  accent: 'bg-emerald-600'
},
{
  icon: Rocket,
  name: 'Launchpad',
  status: 'Coming Soon',
  description:
  'A starter kit and CLI that scaffolds production-ready React + Node applications with our internal best practices baked in.',
  accent: 'bg-surface-700'
}];


export const ProductsGrid = () => {
  return (
    <section className="px-12 max-w-desktop mx-auto pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PRODUCTS.map((product) =>
        <ProductCard key={product.name} {...product} />
        )}
      </div>
    </section>);

};
