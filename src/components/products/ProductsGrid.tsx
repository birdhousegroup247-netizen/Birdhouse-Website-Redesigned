import React from 'react';
import { ProductCard } from '../ui/ProductCard';

const PRODUCTS = [
{
  iconSrc: '/images/products/waka2geda-icon.png',
  name: 'Waka2Geda',
  status: 'Coming Soon',
  description:
  'A community-driven ride-sharing platform that helps people reduce transportation costs by sharing rides with others traveling in the same direction.'
},
{
  iconSrc: '/images/products/birdhouse-crm-icon.png',
  name: 'Birdhouse CRM',
  status: 'Coming Soon',
  description:
  'An all-in-one customer relationship and business management platform designed to help organizations streamline their sales, operations, and client management processes.'
},
{
  iconSrc: '/images/products/birdhouse-hrm-icon.png',
  name: 'Birdhouse HRM',
  status: 'Coming Soon',
  description:
  'An AI-powered Human Resource Management platform designed to simplify and automate every aspect of workforce management.'
},
{
  iconSrc: '/images/products/birdhouse-academy-icon.png',
  name: 'Birdhouse Academy',
  status: 'Coming Soon',
  description:
  'A cloud-based (SaaS) school management platform designed to digitally transform the administration and learning experience of primary, junior, and secondary schools.'
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
