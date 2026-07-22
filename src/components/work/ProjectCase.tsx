import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../data/projects';

export function ProjectCase({
  project,
  reverse,
  first



}: {project: Project;reverse: boolean;first?: boolean;}) {
  return (
    <section id={first ? 'work' : undefined} className="py-20 lg:py-28 px-6 md:px-12 max-w-desktop mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-5 flex flex-col justify-center ${reverse ? 'lg:order-2' : ''}`}>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
              {project.category}
            </span>
            <span className="w-8 h-[1px] bg-surface-300"></span>
            <span className="text-surface-500 dark:text-surface-400 font-medium text-sm">
              {project.year}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 dark:text-white mb-2 leading-tight">
            {project.client}
          </h2>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-8">
            {project.title}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-surface-400 dark:text-surface-300 uppercase tracking-wider mb-2">
                The Challenge
              </h3>
              <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-surface-400 dark:text-surface-300 uppercase tracking-wider mb-2">
                The Solution
              </h3>
              <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-6">
            {project.highlights.map((h) =>
            <span
              key={h}
              className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">

                {h}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            {project.tech.map((t) =>
            <span
              key={t}
              className="px-3 py-1 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-full text-xs font-semibold">

                {t}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-7 flex flex-col gap-4 ${reverse ? 'lg:order-1' : ''}`}>

          {project.images.map((src) =>
          <img
            key={src}
            src={src}
            alt={`${project.client} project screenshot`}
            className="w-full h-auto rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700" />

          )}
        </motion.div>
      </div>
    </section>);

}
