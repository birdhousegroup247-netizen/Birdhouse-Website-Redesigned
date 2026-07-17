import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from './Badge';
interface PortfolioCardProps {
  image: string;
  category: string;
  title: string;
  client: string;
}
export function PortfolioCard({
  image,
  category,
  title,
  client
}: PortfolioCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -10
      }}
      className="group cursor-pointer">
      
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <div className="glass-panel rounded-xl p-4 flex items-center justify-between">
            <span className="font-medium text-text-primary">
              View Case Study
            </span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-text-primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Badge>{category}</Badge>
        <span className="text-sm text-text-tertiary">{client}</span>
      </div>
      <h3 className="text-2xl font-semibold text-text-primary group-hover:text-brand-green transition-colors">
        {title}
      </h3>
    </motion.div>);

}