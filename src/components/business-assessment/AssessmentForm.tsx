import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  clearAssessmentConsultationHandoff,
  saveAssessmentConsultationHandoff
} from '../../lib/assessmentConsultation';

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
}

const ASSESSMENT_STORAGE_KEY = 'birdhouse-business-assessment-state-v1';

const INITIAL_ASSESSMENT_STATE: StoredAssessmentState = {
  currentStep: 0,
  answers: INITIAL_ANSWERS,
  contact: INITIAL_CONTACT,
  consent: false,
  done: false
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
      done: parsed.done === true
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
  'w-full rounded-xl border border-zinc-700 bg-[#0a0c0d] px-5 py-4 font-semibold text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10';

export function AssessmentForm() {
  const navigate = useNavigate();
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
  const [showShareChoice, setShowShareChoice] = useState(false);

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    try {
      window.sessionStorage.setItem(
        ASSESSMENT_STORAGE_KEY,
        JSON.stringify({ currentStep, answers, contact, consent, done })
      );
    } catch {
      // The assessment remains usable if browser storage is unavailable.
    }
  }, [answers, consent, contact, currentStep, done]);

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
    setShowShareChoice(false);
    clearAssessmentConsultationHandoff();
    window.requestAnimationFrame(() => {
      document.getElementById('assessment-step-heading')?.focus();
    });
  };

  const requestConsultation = (includeAssessment: boolean) => {
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

    const message = includeAssessment ?
    `I'd like to request a consultation based on my Birdhouse Business Assessment.

ASSESSMENT ANSWERS
${answerSummary}

RANKED RECOMMENDATIONS
${recommendationSummary}

Additional notes:
` :
    `I'd like to request a consultation about my business.

Additional notes:
`;

    saveAssessmentConsultationHandoff({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      phone: contact.phone,
      subject: 'Business assessment consultation',
      message,
      includesAssessment: includeAssessment
    });
    navigate('/contact');
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
        backgroundColor: '#17191b',
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
            className="rounded-3xl bg-[#17191b] p-6 text-white sm:p-10 lg:p-12">
          <img
            src="/images/logo/logo-white.png"
            alt="Birdhouse Group"
            className="h-auto w-40"
          />
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Your Next Steps
          </p>
          <h3
            id="assessment-results-heading"
            tabIndex={-1}
            className="mt-9 text-3xl font-bold tracking-[-0.03em] text-white outline-none sm:text-4xl">

            A clearer path forward, {firstName}.
          </h3>
          <p className="mt-6 max-w-4xl leading-7 text-zinc-400">
            Based on your answers, these are the areas we suggest exploring first. This is a starting point, not a
            technical audit.
          </p>

          <div className="mt-5">
            {recommendations.map((recommendation, index) =>
            <article
              key={recommendation.name}
              className="border-t border-zinc-700 py-7">

                <p className="text-xs font-bold uppercase text-emerald-300">
                  Priority {String(index + 1).padStart(2, '0')}
                </p>
                <h4 className="mt-3 text-2xl font-bold text-white">{recommendation.name}</h4>
                <p className="mt-3 leading-7 text-zinc-400">{REASONS[recommendation.name]}</p>
              </article>
            )}
          </div>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Your results are ready locally. Download them and share them with Birdhouse when you request a
              consultation. Nothing has been sent.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            aria-expanded={showShareChoice}
            aria-controls="assessment-share-choice"
            onClick={() => setShowShareChoice((current) => !current)}
            className="inline-flex justify-center rounded-full bg-[#13a866] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

            Request a consultation
          </button>
          <button
            type="button"
            onClick={downloadResults}
            disabled={isDownloading}
            className="rounded-full bg-zinc-800 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-zinc-700 focus:outline-none focus:ring-4 focus:ring-zinc-500/40 disabled:cursor-wait disabled:opacity-70">

            {isDownloading ? 'Preparing image...' : 'Download my results'}
          </button>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              moveToStep(0);
            }}
            className="rounded-full bg-transparent px-7 py-4 text-sm font-bold text-white transition-colors hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

            Review answers
          </button>
          <button
            type="button"
            onClick={startNewAssessment}
            className="rounded-full bg-transparent px-7 py-4 text-sm font-bold text-zinc-400 transition-colors hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

            Start a new assessment
          </button>
        </div>
        {showShareChoice &&
        <div
          id="assessment-share-choice"
          className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 sm:p-6">

          <h4 className="text-lg font-bold text-white">Choose what to share</h4>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Your name, email, company and phone number will prefill the Contact form. Nothing is sent until you
            review and submit that form.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            You can also include all eight assessment answers and your three ranked recommendations. The summary
            will be fully editable before submission.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => requestConsultation(true)}
              className="rounded-full bg-[#13a866] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">

              Include my assessment summary
            </button>
            <button
              type="button"
              onClick={() => requestConsultation(false)}
              className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-500/40">

              Continue without assessment details
            </button>
          </div>
        </div>
        }
        {downloadError &&
        <p role="alert" className="mt-4 text-sm text-red-300">
          {downloadError}
        </p>
        }
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-4 text-xs font-semibold uppercase">
        <p className="max-w-[10rem] text-emerald-300">Free Business Assessment</p>
        <p className="text-zinc-400">Step {currentStep + 1} of {STEPS.length}</p>
      </div>
      <div className="mt-6 h-[3px] bg-zinc-700" aria-hidden="true">
        <div
          className="h-full bg-[#13a866] transition-[width] duration-500"
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
            className="text-3xl font-bold tracking-[-0.03em] text-white outline-none sm:text-4xl">

            {step.title}
          </h3>
          <p className="mt-3 text-zinc-400">{step.intro}</p>

          {!isDetailsStep ?
          <div className="mt-8 space-y-6">
              {step.questions.map((question) =>
            <label key={question.key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">{question.label}</span>
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
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                  </span>
                </label>
            )}
            </div> :
          <div className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Full name</span>
                  <input
                  required
                  autoComplete="name"
                  value={contact.name}
                  onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Work email</span>
                  <input
                  required
                  type="email"
                  autoComplete="email"
                  value={contact.email}
                  onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Company name</span>
                  <input
                  required
                  autoComplete="organization"
                  value={contact.company}
                  onChange={(event) => setContact((current) => ({ ...current, company: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block sm:max-w-md">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Phone (optional)</span>
                  <input
                  type="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))}
                  className={controlClass} />
                </label>
              </div>

              <label className="mt-8 flex cursor-pointer items-start gap-4 text-sm leading-6 text-zinc-400">
                <input
                required
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#13a866]" />
                <span>
                  I understand my details and answers are used to generate these results in my browser. I can
                  choose to share them with Birdhouse.
                </span>
              </label>
            </div>
          }
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-5 border-t border-zinc-800 pt-7">
        {currentStep === 0 ?
        <p className="max-w-[10rem] text-xs leading-4 text-zinc-500">Built around your business.</p> :
        <button
          type="button"
          onClick={() => moveToStep(currentStep - 1)}
          className="text-sm font-bold text-white transition-colors hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60">

            Back
          </button>
        }
        <button
          type="submit"
          disabled={!canAdvance}
          className="rounded-full bg-[#13a866] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/30 disabled:cursor-not-allowed disabled:bg-[#0d7148] disabled:text-white/70">

          {isDetailsStep ? 'Get my recommendations' : 'Continue'}
        </button>
      </div>

    </form>
  );
}
