import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { submitForm } from '../../lib/submitForm';

const INFO = [
{
  icon: Mail,
  label: 'Email',
  value: 'hello@birdhousegroup.com'
},
{
  icon: Clock,
  label: 'Response Time',
  value: 'Within 24 hours'
}];


export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
  field: keyof typeof form) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    try {
      await submitForm('contact', form);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 md:px-12 max-w-desktop mx-auto pb-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2rem] p-10 lg:p-12">

          {submitted ?
          <div className="flex flex-col items-center text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Message sent!
              </h3>
              <p className="text-surface-500 dark:text-surface-400">
                Thanks, {form.name.split(' ')[0] || 'there'}. We'll be in
                touch shortly.
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                label="Name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Jane Doe"
                required />

                <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="jane@company.com"
                required />

              </div>
              <Input
              label="Subject"
              value={form.subject}
              onChange={handleChange('subject')}
              placeholder="What can we help with?"
              required />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">
                  Message
                </label>
                <textarea
                value={form.message}
                onChange={handleChange('message')}
                rows={5}
                required
                placeholder="Tell us a bit about your project..."
                className="w-full px-5 py-4 rounded-xl bg-surface-secondary border border-transparent focus:bg-white dark:focus:bg-surface-800 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all outline-none text-text-primary placeholder:text-text-tertiary resize-none" />

              </div>
              {submitError &&
            <p className="text-sm text-red-500">{submitError}</p>
            }
              <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          }
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">

          {INFO.map(({ icon: Icon, label, value }) =>
          <div
            key={label}
            className="flex items-center gap-4 bg-surface-secondary/60 dark:bg-surface-800/60 rounded-2xl p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-surface-500 dark:text-surface-400 font-medium mb-1">
                  {label}
                </div>
                <div className="text-lg font-semibold text-surface-900 dark:text-white break-words">
                  {value}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

};
