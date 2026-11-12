import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { CheckCircle2, ChevronDown, X } from 'lucide-react';
import { clearAssessmentConsultationHandoff } from '../../lib/assessmentConsultation';
import { FormSubmissionError, submitForm } from '../../lib/submitForm';

type AnswerKey =
  'industry' |
  'size' |
  'challenge' |
  'website' |
  'sales' |
  'hr' |
  'time' |
  'improve';

interface Question {
  key: AnswerKey;
  label: string;
  options: string[];
}

interface AssessmentStep {
  title: string;
  intro: string;
  questions: Question[];
}

const STEPS: AssessmentStep[] = [
  {
    title: 'Your business, at a glance.',
    intro: 'Choose the answer that best describes your business.',
    questions: [
      {
        key: 'industry',
        label: 'What kind of business do you run?',
        options: [
          'Professional services',
          'Retail & e-commerce',
          'Technology',
          'Healthcare',
          'Education',
          'Manufacturing & logistics',
          'Other'
        ]
      },
      {
        key: 'size',
        label: 'How many people are on your team?',
        options: ['Just me', '2–10', '11–50', '51–200', '201+']
      }
    ]
  },
  {
    title: 'Where is the friction?',
    intro: 'Choose the answer that best describes your business.',
    questions: [
      {
        key: 'challenge',
        label: 'What is your biggest operational challenge?',
        options: [
          'Manual work & repetitive tasks',
          'Lost leads & customer follow-ups',
          'Employee administration',
          'Disconnected tools',
          'Poor online conversion'
        ]
      },
      {
        key: 'website',
        label: 'How would you describe your website?',
        options: [
          'We don’t have one',
          'Outdated or difficult to use',
          'Looks good, but few enquiries',
          'Works well'
        ]
      }
    ]
  },
  {
    title: 'How does your team work?',
    intro: 'Choose the answer that best describes your business.',
    questions: [
      {
        key: 'sales',
        label: 'How do you manage customers and sales?',
        options: ['Spreadsheets & WhatsApp', 'A CRM that needs improvement', 'A well-connected CRM']
      },
      {
        key: 'hr',
        label: 'How do you manage HR and internal processes?',
        options: ['Paper or spreadsheets', 'Several disconnected tools', 'An integrated HR system']
      }
    ]
  },
  {
    title: 'What should change first?',
    intro: 'Choose the answer that best describes your business.',
    questions: [
      {
        key: 'time',
        label: 'What takes up the most time?',
        options: [
          'Data entry & reporting',
          'Sales follow-ups',
          'HR & payroll',
          'Website updates',
          'Managing disconnected systems'
        ]
      },
      {
        key: 'improve',
        label: 'What would you most like to improve?',
        options: [
          'Automate operations',
          'Build custom software',
          'Improve our website',
          'Organise customer data',
          'Simplify HR',
          'Improve user experience'
        ]
      }
    ]
  },
  {
    title: 'Your next chapter starts here.',
    intro: 'Add your details to generate your recommendations.',
    questions: []
  }
];

const INITIAL_ANSWERS: Record<AnswerKey, string> = {
  industry: '',
  size: '',
  challenge: '',
  website: '',
  sales: '',
  hr: '',
  time: '',
  improve: ''
};

const INITIAL_CONTACT = {
  name: '',
  email: '',
  company: '',
  phone: ''
};

interface StoredAssessmentState {
  currentStep: number;
  answers: Record<AnswerKey, string>;
  contact: typeof INITIAL_CONTACT;
  consent: boolean;
  done: boolean;
  consultationStatus: ConsultationStatus;
}

type ConsultationStatus = 'idle' | 'submitting' | 'success' | 'unknown';

const ASSESSMENT_STORAGE_KEY = 'birdhouse-business-assessment-state-v1';

const INITIAL_ASSESSMENT_STATE: StoredAssessmentState = {
  currentStep: 0,
  answers: INITIAL_ANSWERS,
  contact: INITIAL_CONTACT,
  consent: false,
  done: false,
  consultationStatus: 'idle'
};

function restoreAssessmentState(): StoredAssessmentState {
  try {
    const stored = window.sessionStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!stored) return INITIAL_ASSESSMENT_STATE;

    const parsed = JSON.parse(stored) as Partial<StoredAssessmentState>;
    const currentStep = Number.isInteger(parsed.currentStep) ?
    Math.min(Math.max(parsed.currentStep as number, 0), STEPS.length - 1) :
    0;

    return {
      currentStep,
      answers: { ...INITIAL_ANSWERS, ...parsed.answers },
      contact: { ...INITIAL_CONTACT, ...parsed.contact },
      consent: parsed.consent === true,
      done: parsed.done === true,
      consultationStatus: parsed.consultationStatus === 'success' || parsed.consultationStatus === 'unknown' ?
      parsed.consultationStatus :
      'idle'
    };
  } catch {
    return INITIAL_ASSESSMENT_STATE;
  }
}

const SERVICES = [
  'Business Process Automation',
  'Custom Software Development',
  'Website Design and Development',
  'CRM Solutions',
  'HRM Solutions',
  'UI/UX Design'
] as const;

type ServiceName = typeof SERVICES[number];

const REASONS: Record<ServiceName, string> = {
  'Business Process Automation':
  'Reduce repetitive work and connect the everyday processes that slow your team down.',
  'Custom Software Development':
  'Connect your operations with software designed around your business workflows.',
  'Website Design and Development':
  'Build a credible, modern website that makes it easier for customers to take action.',
  'CRM Solutions': 'Bring leads, customer records and follow-ups into one organised place.',
  'HRM Solutions': 'Simplify employee records, leave, payroll and people operations.',
  'UI/UX Design': 'Make your digital experiences clearer, easier to use and more effective.'
};

function getRecommendations(answers: Record<AnswerKey, string>) {
  const scores = [0, 0, 0, 0, 0, 0];

  if (
    answers.challenge === 'Manual work & repetitive tasks' ||
    answers.time === 'Data entry & reporting'
  ) {
    scores[0] += 3;
  }

  if (
    answers.challenge === 'Disconnected tools' ||
    answers.time === 'Managing disconnected systems'
  ) {
    scores[1] += 3;
    scores[0] += 1;
  }

  if (answers.website && answers.website !== 'Works well') {
    scores[2] += 3;
    if (answers.website === 'Looks good, but few enquiries') scores[5] += 2;
  }

  if (answers.sales && answers.sales !== 'A well-connected CRM') scores[3] += 3;
  if (answers.hr && answers.hr !== 'An integrated HR system') scores[4] += 3;

  if (
    answers.challenge === 'Employee administration' ||
    answers.time === 'HR & payroll'
  ) {
    scores[4] += 2;
  }

  if (
    answers.challenge === 'Lost leads & customer follow-ups' ||
    answers.time === 'Sales follow-ups'
  ) {
    scores[3] += 2;
  }

  const improvement = [
    'Automate operations',
    'Build custom software',
    'Improve our website',
    'Organise customer data',
    'Simplify HR',
    'Improve user experience'
  ].indexOf(answers.improve);

  if (improvement >= 0) scores[improvement] += 5;

  return SERVICES.
  map((name, index) => ({ name, score: scores[index] })).
  sort((a, b) => b.score - a.score).
  filter((recommendation) => recommendation.score > 0).
  slice(0, 3);
}

const controlClass =
  'w-full rounded-xl border border-gray-200 bg-surface-primary px-5 py-4 font-semibold text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 dark:border-zinc-700 dark:bg-[#0a0c0d] dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10';

export function AssessmentForm() {
  const resultsCardRef = useRef<HTMLDivElement>(null);
  const skipNextSaveRef = useRef(false);
  const [restoredState] = useState(restoreAssessmentState);
  const [currentStep, setCurrentStep] = useState(restoredState.currentStep);
  const [answers, setAnswers] = useState(restoredState.answers);
  const [contact, setContact] = useState(restoredState.contact);
  const [consent, setConsent] = useState(restoredState.consent);
  const [done, setDone] = useState(restoredState.done);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [consultationStatus, setConsultationStatus] = useState<ConsultationStatus>(restoredState.consultationStatus);
  const [consultationError, setConsultationError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(restoredState.consultationStatus === 'success');

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    try {
      window.sessionStorage.setItem(
        ASSESSMENT_STORAGE_KEY,
        JSON.stringify({
          currentStep,
          answers,
          contact,
          consent,
          done,
          consultationStatus: consultationStatus === 'submitting' ? 'unknown' : consultationStatus
        })
      );
    } catch {
      // The assessment remains usable if browser storage is unavailable.
    }
  }, [answers, consent, consultationStatus, contact, currentStep, done]);

  const step = STEPS[currentStep];
  const isDetailsStep = currentStep === STEPS.length - 1;
  const recommendations = getRecommendations(answers);
  const questionsComplete = step.questions.every((question) => answers[question.key] !== '');
  const detailsComplete =
  contact.name.trim() !== '' &&
  contact.email.trim() !== '' &&
  contact.company.trim() !== '' &&
  consent;
  const canAdvance = isDetailsStep ? detailsComplete : questionsComplete;

  const moveToStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    window.requestAnimationFrame(() => {
      document.getElementById('assessment-step-heading')?.focus();
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canAdvance) return;

    if (!isDetailsStep) {
      moveToStep(currentStep + 1);
      return;
    }

    setDone(true);
    window.requestAnimationFrame(() => {
      document.getElementById('assessment-results-heading')?.focus();
    });
  };

  const startNewAssessment = () => {
    skipNextSaveRef.current = true;
    try {
      window.sessionStorage.removeItem(ASSESSMENT_STORAGE_KEY);
    } catch {
      // State still resets in memory if browser storage is unavailable.
    }
    setCurrentStep(0);
    setAnswers(INITIAL_ANSWERS);
    setContact(INITIAL_CONTACT);
    setConsent(false);
    setDone(false);
    setDownloadError('');
    setConsultationStatus('idle');
    setConsultationError('');
    setShowSuccessToast(false);
    clearAssessmentConsultationHandoff();
    window.requestAnimationFrame(() => {
      document.getElementById('assessment-step-heading')?.focus();
    });
  };

  const requestConsultation = async () => {
    if (consultationStatus === 'submitting' || consultationStatus === 'success' || consultationStatus === 'unknown') {
      return;
    }

    const answerSummary = [
      ['Business type', answers.industry],
      ['Team size', answers.size],
      ['Operational challenge', answers.challenge],
      ['Website status', answers.website],
      ['Customer and sales tools', answers.sales],
      ['HR processes', answers.hr],
      ['Biggest time bottleneck', answers.time],
      ['Desired improvement', answers.improve]
    ].map(([label, value]) => `- ${label}: ${value}`).join('\n');
    const recommendationSummary = recommendations.map(
      (recommendation, index) =>
      `${index + 1}. ${recommendation.name}\n   ${REASONS[recommendation.name]}`
    ).join('\n');

    setConsultationStatus('submitting');
    setConsultationError('');
    setShowSuccessToast(false);

    try {
      await submitForm('contact', {
        name: contact.name,
        email: contact.email,
        company: contact.company,
        phone: contact.phone,
        subject: 'Business assessment consultation',
        message: 'The visitor explicitly requested a consultation from their completed Business Assessment results.',
        'Assessment answers': answerSummary,
        'Ranked recommendations': recommendationSummary
      });
      clearAssessmentConsultationHandoff();
      setConsultationStatus('success');
      setShowSuccessToast(true);
    } catch (error) {
      const deliveryUnknown = error instanceof FormSubmissionError && error.deliveryStatus === 'unknown';
      setConsultationStatus(deliveryUnknown ? 'unknown' : 'idle');
      setConsultationError(
        error instanceof Error ? error.message : 'We could not send your consultation request. Please try again.'
      );
    }
  };

  const downloadResults = async () => {
    if (!resultsCardRef.current || isDownloading) return;

    setIsDownloading(true);
    setDownloadError('');

    try {
      await document.fonts?.ready;
      await Promise.all(
        Array.from(resultsCardRef.current.querySelectorAll('img')).map((image) => {
          if (image.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            image.addEventListener('load', () => resolve(), { once: true });
            image.addEventListener('error', () => resolve(), { once: true });
          });
        })
      );

      const dataUrl = await toPng(resultsCardRef.current, {
        backgroundColor: window.getComputedStyle(resultsCardRef.current).backgroundColor,
        cacheBust: true,
        pixelRatio: 2
      });
      const anchor = document.createElement('a');
      anchor.href = dataUrl;
      anchor.download = 'birdhouse-business-assessment-results.png';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (error) {
      console.error('Unable to create assessment results image.', error);
      setDownloadError('We couldn\'t create your image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (done) {
    const firstName = contact.name.split(' ')[0];

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-live="polite">

        <div className="-m-6 sm:-m-10 lg:-m-12">
          <div
            ref={resultsCardRef}
            className="rounded-3xl bg-surface-secondary p-6 text-text-primary transition-colors duration-300 dark:bg-[#17191b] dark:text-white sm:p-10 lg:p-12">
          <img
            src="/images/logo/logo-black.png"
            alt="Birdhouse Group"
            className="h-auto w-40 dark:hidden"
          />
          <img
            src="/images/logo/logo-white.png"
            alt="Birdhouse Group"
            className="hidden h-auto w-40 dark:block"
          />
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-brand-green dark:text-emerald-300">
            Your Next Steps
          </p>
          <h3
            id="assessment-results-heading"
            tabIndex={-1}
            className="mt-9 text-3xl font-bold tracking-[-0.03em] text-text-primary outline-none dark:text-white sm:text-4xl">

            A clearer path forward, {firstName}.
          </h3>
          <p className="mt-6 max-w-4xl leading-7 text-text-secondary">
            Based on your answers, these are the areas we suggest exploring first. This is a starting point, not a
            technical audit.
          </p>

          <div className="mt-5">
            {recommendations.map((recommendation, index) =>
            <article
              key={recommendation.name}
              className="border-t border-gray-200 py-7 dark:border-zinc-700">

                <p className="text-xs font-bold uppercase text-brand-green dark:text-emerald-300">
                  Priority {String(index + 1).padStart(2, '0')}
                </p>
                <h4 className="mt-3 text-2xl font-bold text-text-primary dark:text-white">{recommendation.name}</h4>
                <p className="mt-3 leading-7 text-text-secondary">{REASONS[recommendation.name]}</p>
              </article>
            )}
          </div>

            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Your results are ready locally. Nothing has been sent. Choosing Request a consultation will email
              your contact details, answers and ranked recommendations to Birdhouse.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={requestConsultation}
            disabled={consultationStatus !== 'idle'}
            className="inline-flex justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 disabled:cursor-not-allowed disabled:bg-[#0d7148] disabled:text-white/70 dark:bg-[#13a866] dark:hover:bg-emerald-400">

            {consultationStatus === 'submitting' ? 'Sending request...' :
            consultationStatus === 'success' ? 'Consultation requested' :
            consultationStatus === 'unknown' ? 'Delivery status unknown' :
            'Request a consultation'}
          </button>
          <button
            type="button"
            onClick={downloadResults}
            disabled={isDownloading}
            className="rounded-full bg-surface-tertiary px-7 py-4 text-sm font-bold text-text-primary transition-colors hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300/50 disabled:cursor-wait disabled:opacity-70 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:focus:ring-zinc-500/40">

            {isDownloading ? 'Preparing image...' : 'Download my results'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (consultationStatus === 'success') setConsultationStatus('idle');
              setConsultationError('');
              setShowSuccessToast(false);
              setDone(false);
              moveToStep(0);
            }}
            className="rounded-full bg-transparent px-7 py-4 text-sm font-bold text-text-primary transition-colors hover:text-brand-green focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:text-white dark:hover:text-emerald-300">

            Review answers
          </button>
          <button
            type="button"
            onClick={startNewAssessment}
            className="rounded-full bg-transparent px-7 py-4 text-sm font-bold text-text-secondary transition-colors hover:text-brand-green focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:hover:text-emerald-300">

            Start a new assessment
          </button>
        </div>
        {consultationError &&
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-200">
          {consultationError}
        </p>
        }
        {downloadError &&
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-300">
          {downloadError}
        </p>
        }
        {showSuccessToast &&
        <div
          role="status"
          className="fixed bottom-5 left-5 right-5 z-[70] flex items-start gap-3 rounded-2xl border border-emerald-200 bg-surface-primary p-4 text-text-primary shadow-2xl shadow-black/15 transition-colors duration-300 dark:border-emerald-400/30 dark:bg-[#17191b] dark:text-white dark:shadow-black/40 sm:left-auto sm:right-6 sm:max-w-md">

          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <div className="min-w-0 flex-1">
            <p className="font-bold">Consultation request sent</p>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Birdhouse has received your assessment. We&apos;ll be in touch shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccessToast(false)}
            aria-label="Dismiss success message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-tertiary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-300/70 dark:hover:bg-zinc-800 dark:hover:text-white">

            <X className="h-4 w-4" />
          </button>
        </div>
        }
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-4 text-xs font-semibold uppercase">
        <p className="max-w-[10rem] text-brand-green dark:text-emerald-300">Free Business Assessment</p>
        <p className="text-text-secondary">Step {currentStep + 1} of {STEPS.length}</p>
      </div>
      <div className="mt-6 h-[3px] bg-surface-tertiary dark:bg-zinc-700" aria-hidden="true">
        <div
          className="h-full bg-brand-green transition-[width] duration-500 dark:bg-[#13a866]"
          style={{ width: `${(currentStep + 1) / STEPS.length * 100}%` }} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
          className="mt-9">

          <h3
            id="assessment-step-heading"
            tabIndex={-1}
            className="text-3xl font-bold tracking-[-0.03em] text-text-primary outline-none dark:text-white sm:text-4xl">

            {step.title}
          </h3>
          <p className="mt-3 text-text-secondary">{step.intro}</p>

          {!isDetailsStep ?
          <div className="mt-8 space-y-6">
              {step.questions.map((question) =>
            <label key={question.key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-text-primary dark:text-zinc-200">{question.label}</span>
                  <span className="relative block">
                    <select
                  required
                  value={answers[question.key]}
                  onChange={(event) =>
                  setAnswers((current) => ({ ...current, [question.key]: event.target.value }))
                  }
                  className={`${controlClass} appearance-none pr-12`}>

                      <option value="">Select an answer</option>
                      {question.options.map((option) =>
                  <option key={option} value={option}>{option}</option>
                  )}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-zinc-300" />
                  </span>
                </label>
            )}
            </div> :
          <div className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-text-primary dark:text-zinc-200">Full name</span>
                  <input
                  required
                  autoComplete="name"
                  value={contact.name}
                  onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-text-primary dark:text-zinc-200">Work email</span>
                  <input
                  required
                  type="email"
                  autoComplete="email"
                  value={contact.email}
                  onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-text-primary dark:text-zinc-200">Company name</span>
                  <input
                  required
                  autoComplete="organization"
                  value={contact.company}
                  onChange={(event) => setContact((current) => ({ ...current, company: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block sm:max-w-md">
                  <span className="mb-2 block text-sm font-semibold text-text-primary dark:text-zinc-200">Phone (optional)</span>
                  <input
                  type="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))}
                  className={controlClass} />
                </label>
              </div>

              <label className="mt-8 flex cursor-pointer items-start gap-4 text-sm leading-6 text-text-secondary">
                <input
                required
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#13a866]" />
                <span>
                  I understand my details and answers are used to generate these results in my browser. Nothing is
                  sent when I get my recommendations. If I choose &ldquo;Request a consultation,&rdquo; my contact
                  details, all eight answers and ranked recommendations will be emailed to Birdhouse.
                </span>
              </label>
            </div>
          }
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-5 border-t border-gray-200 pt-7 dark:border-zinc-800">
        {currentStep === 0 ?
        <p className="max-w-[10rem] text-xs leading-4 text-text-tertiary">Built around your business.</p> :
        <button
          type="button"
          onClick={() => moveToStep(currentStep - 1)}
          className="text-sm font-bold text-text-primary transition-colors hover:text-brand-green focus:outline-none focus:ring-2 focus:ring-emerald-300/60 dark:text-white dark:hover:text-emerald-300">

            Back
          </button>
        }
        <button
          type="submit"
          disabled={!canAdvance}
          className="rounded-full bg-brand-green px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 disabled:cursor-not-allowed disabled:bg-[#0d7148] disabled:text-white/70 dark:bg-[#13a866] dark:hover:bg-emerald-400">

          {isDetailsStep ? 'Get my recommendations' : 'Continue'}
        </button>
      </div>

    </form>
  );
}
