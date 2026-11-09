import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type AnswerKey =
  'businessType' |
  'teamSize' |
  'operationalChallenge' |
  'websiteState' |
  'customerManagement' |
  'hrManagement' |
  'timeDrain' |
  'improvementPriority';

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
        key: 'businessType',
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
        key: 'teamSize',
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
        key: 'operationalChallenge',
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
        key: 'websiteState',
        label: 'How would you describe your website?',
        options: [
          "We don't have one",
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
        key: 'customerManagement',
        label: 'How do you manage customers and sales?',
        options: ['Spreadsheets & WhatsApp', 'A CRM that needs improvement', 'A well-connected CRM']
      },
      {
        key: 'hrManagement',
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
        key: 'timeDrain',
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
        key: 'improvementPriority',
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
  businessType: '',
  teamSize: '',
  operationalChallenge: '',
  websiteState: '',
  customerManagement: '',
  hrManagement: '',
  timeDrain: '',
  improvementPriority: ''
};

const INITIAL_DETAILS = {
  fullName: '',
  workEmail: '',
  companyName: '',
  phone: ''
};

const controlClass =
  'w-full rounded-xl border border-zinc-700 bg-[#0a0c0d] px-5 py-4 font-semibold text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10';

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const step = STEPS[currentStep];
  const isDetailsStep = currentStep === STEPS.length - 1;
  const questionsComplete = step.questions.every((question) => answers[question.key] !== '');
  const detailsComplete =
  details.fullName.trim() !== '' &&
  details.workEmail.trim() !== '' &&
  details.companyName.trim() !== '' &&
  consent;
  const canAdvance = isDetailsStep ? detailsComplete : questionsComplete;

  const moveToStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    setStatusMessage('');
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

    setStatusMessage(
      'Your answers remain in this browser. Recommendation logic has not been connected yet, and nothing was sent to Birdhouse.'
    );
  };

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
                  value={details.fullName}
                  onChange={(event) => setDetails((current) => ({ ...current, fullName: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Work email</span>
                  <input
                  required
                  type="email"
                  autoComplete="email"
                  value={details.workEmail}
                  onChange={(event) => setDetails((current) => ({ ...current, workEmail: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Company name</span>
                  <input
                  required
                  autoComplete="organization"
                  value={details.companyName}
                  onChange={(event) => setDetails((current) => ({ ...current, companyName: event.target.value }))}
                  className={controlClass} />
                </label>
                <label className="block sm:max-w-md">
                  <span className="mb-2 block text-sm font-semibold text-zinc-200">Phone (optional)</span>
                  <input
                  type="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(event) => setDetails((current) => ({ ...current, phone: event.target.value }))}
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

      {statusMessage &&
      <p role="status" className="mt-6 rounded-xl border border-emerald-700/50 bg-emerald-900/20 p-4 text-sm leading-6 text-emerald-200">
          {statusMessage}
        </p>
      }
    </form>
  );
}
