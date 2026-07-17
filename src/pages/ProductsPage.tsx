import React from 'react';
import { ProductsHero } from '../components/products/ProductsHero';
import { ProductsGrid } from '../components/products/ProductsGrid';
export function ProductsPage() {
  return (
    <main className="bg-surface-secondary">
      <ProductsHero />
      <ProductsGrid />
    </main>);

}
