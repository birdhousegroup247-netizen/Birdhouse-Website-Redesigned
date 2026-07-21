import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const POSITIONS = [
{
  title: 'QA Tester',
  department: 'Engineering',
  type: 'Full-time',
  location: 'Remote',
  status: 'Open'
}];


export const OpenPositions = () => {
  return (
    <section
      id="open-positions"
      className="py-32 px-6 md:px-12 max-w-desktop mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 dark:text-white mb-4 leading-tight">
          Open Positions
        </h2>
        <p className="text-base sm:text-xl text-surface-500 dark:text-surface-400">
          Come join the team!
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {POSITIONS.map((role) =>
        <motion.div
          key={role.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2rem] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors duration-300">

          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
              'repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
              color: '#0F9D58'
            }}>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
              {role.title}
            </h3>
            <p className="text-surface-500 dark:text-surface-400 font-medium">
              {role.department} · {role.type} · {role.location}
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 shrink-0">
            <Link
              to={`/careers/apply?role=${encodeURIComponent(role.title)}`}
              className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">

              Apply Now
            </Link>
            <span className="text-sm text-surface-500 dark:text-surface-400">
              Status: {role.status}
            </span>
          </div>
        </motion.div>
        )}
      </div>
    </section>);

};
