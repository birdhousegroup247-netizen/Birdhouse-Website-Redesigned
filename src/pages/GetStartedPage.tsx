import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../data/categories';
import { submitForm } from '../lib/submitForm';

const fieldClass =
'w-full px-5 py-4 rounded-xl bg-surface-primary dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all outline-none text-text-primary placeholder:text-text-tertiary';

export function GetStartedPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    message: ''
  });

  const handleChange = (field: keyof typeof form) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitError('');
    setIsSubmitting(true);
    try {
      await submitForm('project-inquiry', form);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-surface-secondary min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none text-surface-900 dark:text-white"
        style={{
          backgroundImage:
          'repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)'
        }}>
      </div>

      <section className="relative z-10 pt-32 sm:pt-36 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-10">

          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-surface-900 dark:text-white mb-4 leading-tight">
            Let's get to know!
          </h1>
          <p className="text-lg sm:text-xl text-surface-500 dark:text-surface-400">
            Tell us about that big idea.
          </p>
        </motion.div>

        {submitted ?
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-16 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl">

            <CheckCircle2 className="w-12 h-12 text-brand-green mb-4" />
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              Thanks, {form.name.split(' ')[0]}!
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              We've received your project details and will be in touch shortly.
            </p>
          </motion.div> :

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6">

            <div>
              <label className="block text-text-secondary font-medium mb-3">Your Full Name</label>
              <input value={form.name} onChange={handleChange('name')} required className={fieldClass} />
            </div>

            <div>
              <label className="block text-text-secondary font-medium mb-3">Email Address</label>
              <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
              className={fieldClass} />

            </div>

            <div>
              <label className="block text-text-secondary font-medium mb-3">Phone Number</label>
              <input type="tel" value={form.phone} onChange={handleChange('phone')} className={fieldClass} />
            </div>

            <div>
              <label className="block text-text-secondary font-medium mb-3">
                Location (Country, State/Province)
              </label>
              <input value={form.location} onChange={handleChange('location')} className={fieldClass} />
            </div>

            <div>
              <label className="block text-text-secondary font-medium mb-3">
                Select from catalogue (Optional)
              </label>
              <div className="relative">
                <select
                value={form.category}
                onChange={handleChange('category')}
                className={`${fieldClass} appearance-none pr-12`}>

                  <option value="" className="bg-white dark:bg-surface-900">
                    Select an option...
                  </option>
                  {PROJECT_CATEGORIES.map((c) =>
                <option key={c} value={c} className="bg-white dark:bg-surface-900">
                      {c}
                    </option>
                )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary font-medium mb-3">
                What do you want to build?
              </label>
              <textarea
              value={form.message}
              onChange={handleChange('message')}
              required
              rows={5}
              className={`${fieldClass} resize-none`} />

            </div>

            {submitError &&
          <p className="text-sm text-red-500">{submitError}</p>
          }

            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-full bg-brand-green text-white font-bold text-lg hover:bg-brand-greenDark transition-colors disabled:opacity-50">

              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </motion.form>
        }
      </section>
    </main>);

}
