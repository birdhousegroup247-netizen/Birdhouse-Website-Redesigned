import React from 'react';
import { Star } from 'lucide-react';
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}
export function TestimonialCard({
  quote,
  author,
  role,
  company,
  image
}: TestimonialCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
      <Star className="w-8 h-8 text-brand-green mb-8" />
      <p className="text-xl leading-relaxed text-text-primary mb-10 font-medium">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={author}
          className="w-14 h-14 rounded-full object-cover" />
        
        <div>
          <h4 className="font-semibold text-text-primary">{author}</h4>
          <p className="text-sm text-text-secondary">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>);

}