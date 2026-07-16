import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import { Badge } from './Badge';

interface ProductCardProps {
  icon?: LucideIcon;
  iconSrc?: string;
  name: string;
  status: string;
  description: string;
  accent?: string;
}

export function ProductCard({
  icon: Icon,
  iconSrc,
  name,
  status,
  description,
  accent = 'bg-emerald-500'
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2rem] p-10 flex flex-col hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-surface-900/5">

      <div className="flex items-center justify-between mb-8">
        {iconSrc ?
        <div className="w-14 h-14 rounded-2xl overflow-hidden">
            <img src={iconSrc} alt="" className="w-full h-full object-cover" />
          </div> :

        <div
          className={`w-14 h-14 rounded-2xl ${accent} flex items-center justify-center overflow-hidden`}>
            {Icon && <Icon className="w-6 h-6 text-white" />}
          </div>
        }
        <Badge variant="success">{status}</Badge>
      </div>

      <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">{name}</h3>
      <p className="text-surface-500 dark:text-surface-400 leading-relaxed mb-8 flex-1">
        {description}
      </p>

      <button className="group/btn inline-flex items-center gap-2 font-semibold text-surface-900 dark:text-white hover:text-emerald-600 transition-colors self-start">
        Learn More
        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </button>
    </motion.div>);

}
