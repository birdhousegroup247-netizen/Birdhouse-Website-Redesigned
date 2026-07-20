import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Paperclip, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { uploadAllToCloudinary, isCloudinaryConfigured } from '../../lib/cloudinary';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
'application/pdf',
'application/msword',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const ALLOWED_EXTENSIONS = '.pdf,.doc,.docx';

export const ApplyForm = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'General Application';

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', portfolio: '', message: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof typeof form) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Please attach a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File is over the ${MAX_FILE_SIZE_MB}MB limit.`);
      return;
    }
    setFileError('');
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !resume) return;
    setSubmitError('');
    setIsSubmitting(true);
    try {
      if (isCloudinaryConfigured) {
        // TODO: once a backend/email service exists, send the resulting
        // resume URL plus the form fields and role there.
        await uploadAllToCloudinary([resume]);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong submitting your application. Please try again.'
      );
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
          className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-[2rem] p-6 sm:p-10 lg:p-12">

          {submitted ?
          <div className="flex flex-col items-center text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Application sent!
              </h3>
              <p className="text-surface-500 dark:text-surface-400">
                Thanks, {form.name.split(' ')[0] || 'there'}. We've received your application
                for {role} and will be in touch shortly.
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
                placeholder="jane@email.com"
                required />

              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+1 (555) 000-0000" />

                <Input
                label="LinkedIn / Portfolio"
                value={form.portfolio}
                onChange={handleChange('portfolio')}
                placeholder="linkedin.com/in/janedoe" />

              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">
                  Resume / CV
                </label>
                <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_EXTENSIONS}
                onChange={handleResumeSelect}
                className="hidden" />

                {resume ?
              <div className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-surface-secondary">
                    <span className="flex items-center gap-2 text-sm font-medium text-text-primary truncate">
                      <Paperclip className="w-4 h-4 shrink-0 text-brand-green" />
                      <span className="truncate">{resume.name}</span>
                    </span>
                    <button
                  type="button"
                  onClick={() => setResume(null)}
                  className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center hover:bg-surface-tertiary transition-colors">

                      <X className="w-4 h-4" />
                    </button>
                  </div> :

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-surface-700 text-text-secondary hover:border-brand-green hover:text-brand-green transition-colors text-sm font-medium">

                    <Paperclip className="w-4 h-4" />
                    Attach resume (PDF, DOC, DOCX — max {MAX_FILE_SIZE_MB}MB)
                  </button>
              }
                {fileError &&
              <p className="text-xs text-red-500">{fileError}</p>
              }
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">
                  Cover Letter
                </label>
                <textarea
                value={form.message}
                onChange={handleChange('message')}
                rows={5}
                placeholder="Tell us why you'd be a great fit..."
                className="w-full px-5 py-4 rounded-xl bg-surface-secondary border border-transparent focus:bg-white dark:focus:bg-surface-800 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all outline-none text-text-primary placeholder:text-text-tertiary resize-none" />

              </div>

              {submitError &&
            <p className="text-sm text-red-500">{submitError}</p>
            }

              <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !resume}
              className="self-start">

                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          }
        </motion.div>
      </div>
    </section>);

};
