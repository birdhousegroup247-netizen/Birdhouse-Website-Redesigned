import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Plus, CheckCircle2, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

type Step = 'prompt' | 'details' | 'success';

const CATEGORIES = [
'Web Application',
'Mobile Application',
'E-commerce Platform',
'SaaS Product',
'MVP Development',
'Custom Solution',
'Consultation'];

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
'image/png',
'image/jpeg',
'image/webp',
'image/gif',
'application/pdf',
'application/msword',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const ALLOWED_EXTENSIONS = '.png,.jpg,.jpeg,.webp,.gif,.pdf,.doc,.docx';

export function ProjectInquiryBox() {
  const [step, setStep] = useState<Step>('prompt');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (selected.length === 0) return;

    const accepted: File[] = [];
    let error = '';

    for (const file of selected) {
      if (files.length + accepted.length >= MAX_FILES) {
        error = `You can attach up to ${MAX_FILES} files.`;
        break;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = `"${file.name}" isn't a supported file type.`;
        continue;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        error = `"${file.name}" is over the ${MAX_FILE_SIZE_MB}MB limit.`;
        continue;
      }
      accepted.push(file);
    }

    setFiles((prev) => [...prev, ...accepted]);
    setFileError(error);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !category) return;
    setStep('success');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <AnimatePresence mode="wait">
        {step === 'prompt' &&
        <motion.form
          key="prompt"
          onSubmit={handlePromptSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white dark:bg-surface-800 border border-gray-200 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow p-3 text-left">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project..."
            rows={1}
            className="w-full resize-none outline-none bg-transparent text-base text-text-primary placeholder:text-text-tertiary px-2 pt-1" />

          {files.length > 0 &&
          <div className="flex flex-wrap gap-2 px-2 pt-2">
            {files.map((file, i) =>
            <span
              key={`${file.name}-${i}`}
              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-surface-secondary text-xs font-medium text-text-secondary">

                <span className="max-w-[140px] truncate">{file.name}</span>
                <button
                type="button"
                onClick={() => removeFile(i)}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-surface-tertiary transition-colors">

                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          }

          {fileError &&
          <p className="px-2 pt-2 text-xs text-red-500">{fileError}</p>
          }

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS}
            onChange={handleFileSelect}
            className="hidden" />


          <div className="flex items-center justify-between px-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={files.length >= MAX_FILES}
              title={`Attach files (max ${MAX_FILES}, ${MAX_FILE_SIZE_MB}MB each)`}
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-surface-700 flex items-center justify-center text-text-secondary hover:bg-surface-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-greenDark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </motion.form>
        }

        {step === 'details' &&
        <motion.form
          key="details"
          onSubmit={handleDetailsSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white dark:bg-surface-800 border border-gray-200 dark:border-surface-700 shadow-sm p-6 text-left flex flex-col gap-4">

          <p className="text-sm text-text-tertiary italic">"{message}"</p>
          {files.length > 0 &&
          <p className="text-xs text-text-tertiary -mt-2">
            {files.length} file{files.length > 1 ? 's' : ''} attached
          </p>
          }
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              required />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              required />

            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl bg-surface-secondary border border-transparent focus:bg-white dark:focus:bg-surface-800 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all outline-none text-text-primary">

                <option value="">Select an option...</option>
                {CATEGORIES.map((c) =>
                <option key={c} value={c}>
                    {c}
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep('prompt')}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Back
            </button>
            <Button type="submit" size="md">
              Send
            </Button>
          </div>
        </motion.form>
        }

        {step === 'success' &&
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white dark:bg-surface-800 border border-gray-200 dark:border-surface-700 shadow-sm p-6 flex items-center justify-center gap-3 text-text-primary">

          <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
          <span className="font-medium">
            Thanks, {name.split(' ')[0]}! We'll be in touch shortly.
          </span>
        </motion.div>
        }
      </AnimatePresence>
    </div>);

}
