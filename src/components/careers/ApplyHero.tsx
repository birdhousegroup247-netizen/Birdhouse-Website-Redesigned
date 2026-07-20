import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ApplyHero = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  return (
    <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 md:px-12 max-w-desktop mx-auto overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

      <div className="flex flex-col items-center text-center z-10 max-w-3xl mx-auto">
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-brand-green transition-colors mb-6">

          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.05] mb-6 text-balance">

          {role ?
          <>Apply for <span className="text-emerald-500">{role}</span></> :

          <>Apply to <span className="text-emerald-500">Birdhouse.</span></>
          }
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed text-balance font-medium">

          Tell us a bit about yourself and attach your resume. We'll get back to you within a few business days.
        </motion.p>
      </div>
    </section>);

};
