import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AssessmentForm } from './AssessmentForm';
import { YouTubeShortEmbed } from '../shared/YouTubeShortEmbed';

const revealTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] } as const;

function Reveal({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={revealTransition}
      className={className}>

      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: {children: ReactNode;}) {
  return (
    <p className="mb-10 text-xs font-bold uppercase tracking-tight text-brand-green dark:text-emerald-300 sm:mb-12">
      {children}
    </p>
  );
}

const heroSteps = [
  { number: '01', title: 'Identify the friction', description: "See what's slowing you down." },
  { number: '02', title: 'Find your direction', description: 'Get a tailored solution shortlist.' },
  { number: '03', title: 'Move forward', description: 'Build a stronger business for 2027.' }
];

const challenges = [
  {
    number: '01',
    title: 'Too much manual work',
    description: 'Spreadsheets, repeated data entry and disconnected tools are eating into your day.'
  },
  {
    number: '02',
    title: 'Leads slipping away',
    description: 'Customer details live everywhere. Follow-ups happen late, or not at all.'
  },
  {
    number: '03',
    title: 'A website that holds you back',
    description: 'An outdated digital presence makes it harder to earn trust and turn visits into enquiries.'
  },
  {
    number: '04',
    title: 'People processes on paper',
    description: 'Leave requests, payroll and employee records take more effort than they should.'
  },
  {
    number: '05',
    title: "Tools that don't talk",
    description: 'Your teams work in silos while vital information gets lost between systems.'
  },
  {
    number: '06',
    title: 'No clear next step',
    description: "You know technology could help. You're just not sure where to start."
  }
];

const services = [
  {
    number: '01',
    title: 'Custom Software Development',
    description: 'Software built for the way you work. Connect systems, remove friction and scale with confidence.'
  },
  {
    number: '02',
    title: 'Website Design and Development',
    description: 'A fast, credible digital presence that turns interest into meaningful business enquiries.'
  },
  {
    number: '03',
    title: 'CRM Solutions',
    description: 'One clear view of your customers, sales pipeline and every follow-up that matters.'
  },
  {
    number: '04',
    title: 'HRM Solutions',
    description: 'Bring people, payroll and everyday employee processes into one organised system.'
  },
  {
    number: '05',
    title: 'Business Process Automation',
    description: 'Give your team time back by replacing repetitive tasks with connected workflows.',
    featured: true
  },
  {
    number: '06',
    title: 'UI/UX Design',
    description: 'Make complex products feel simple with thoughtful, intuitive digital experiences.'
  }
];

const reasons = [
  {
    title: 'Clarity before complexity',
    description: 'We take the time to understand your goals, your team and the real problem before proposing a solution.'
  },
  {
    title: 'Design and development, together',
    description: 'Strategy, user experience and engineering work as one, from the first conversation to delivery.'
  },
  {
    title: 'Built for your next stage',
    description: 'Practical solutions that fit where you are today and support where your business wants to go.'
  }
];

function scrollToAssessment() {
  document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
}

export function CampaignHero() {
  return (
    <section className="bg-surface-primary px-6 pb-20 pt-40 text-text-primary transition-colors duration-300 dark:bg-[#090b0c] dark:text-white sm:px-8 sm:pb-24 sm:pt-44 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-[1104px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition}
          className="mb-8 text-xs font-bold uppercase text-brand-green dark:text-emerald-300">

          The 2027 Business Reset
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...revealTransition, delay: 0.08 }}
          className="mx-auto max-w-5xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-text-primary dark:text-white sm:text-6xl lg:text-[72px]">

          Don&apos;t Carry 2026&apos;s Business Problems Into{' '}
          <span className="text-emerald-300">2027.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...revealTransition, delay: 0.16 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">

          Your business may be losing time, money and opportunities to outdated systems and inefficient
          processes. Discover what&apos;s holding you back and find the right solutions before 2027.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...revealTransition, delay: 0.24 }}
          className="mt-8">

          <button
            type="button"
            onClick={scrollToAssessment}
            className="w-full rounded-full bg-brand-green px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:bg-[#13a866] dark:hover:bg-emerald-400 sm:w-auto sm:px-10">

            Get Your Free Business Assessment
          </button>
          <p className="mt-6 text-sm text-text-tertiary">
            Free assessment. Practical recommendations. No obligation.
          </p>
        </motion.div>

        <Reveal className="mt-12 grid gap-8 rounded-3xl border border-gray-200 bg-surface-secondary px-6 py-8 text-left dark:border-zinc-800 dark:bg-transparent sm:grid-cols-3 sm:px-8">
          {heroSteps.map((step) =>
          <div key={step.number}>
              <p className="mb-3 text-sm font-bold text-brand-green dark:text-emerald-300">{step.number}</p>
              <h2 className="font-bold text-text-primary dark:text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-text-tertiary">{step.description}</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function BusinessChallenges() {
  return (
    <section id="challenges" className="scroll-mt-24 bg-surface-secondary px-6 py-20 text-text-primary transition-colors duration-300 dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1104px]">
        <Reveal>
          <SectionLabel>01 / The Cost of Standing Still</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
            A new year won&apos;t fix old systems.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary">
            The small workarounds you live with today can become the biggest barriers to tomorrow&apos;s growth.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) =>
          <motion.article
            key={challenge.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...revealTransition, delay: index % 3 * 0.06 }}
            className="min-h-[238px] rounded-3xl border border-gray-100 bg-surface-primary p-7 shadow-soft transition-colors duration-300 dark:border-transparent dark:bg-[#202224] dark:shadow-none sm:p-8">

              <p className="text-sm font-bold text-brand-green dark:text-emerald-300">{challenge.number}</p>
              <h3 className="mt-7 text-2xl font-bold leading-snug text-text-primary dark:text-white">{challenge.title}</h3>
              <p className="mt-6 text-lg leading-7 text-text-secondary">{challenge.description}</p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}

export function AssessmentSection() {
  return (
    <section id="assessment" className="scroll-mt-24 bg-surface-primary px-6 py-20 text-text-primary transition-colors duration-300 dark:bg-[#090b0c] dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1104px]">
        <Reveal>
          <SectionLabel>02 / A Clearer Picture</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
            Let&apos;s find what&apos;s holding you back.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary">
            A few focused questions. A more useful starting point. Get recommendations shaped around your
            business, not a one-size-fits-all pitch.
          </p>
        </Reveal>

        <Reveal className="mt-12 rounded-3xl border border-gray-200 bg-surface-secondary p-6 shadow-soft transition-colors duration-300 dark:border-zinc-800 dark:bg-[#17191b] dark:shadow-none sm:p-10 lg:p-12">
          <AssessmentForm />
        </Reveal>
      </div>
    </section>
  );
}

export function CampaignServices() {
  return (
    <section id="solutions" className="scroll-mt-24 bg-surface-secondary px-6 py-20 text-text-primary transition-colors duration-300 dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1104px]">
        <Reveal>
          <SectionLabel>03 / The Right Solution, Not More Software</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
            Better systems. Stronger business.
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-text-secondary">
            From the first customer interaction to the way your team works behind the scenes, we connect design
            and technology to real business needs.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) =>
          <motion.article
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...revealTransition, delay: index % 3 * 0.06 }}
            className={`min-h-[265px] rounded-3xl p-7 transition-colors duration-300 sm:p-8 ${service.featured ? 'bg-brand-green dark:bg-[#13a866]' : 'border border-gray-100 bg-surface-primary shadow-soft dark:border-transparent dark:bg-[#202224] dark:shadow-none'}`}>

              <p className={`text-sm font-bold ${service.featured ? 'text-white' : 'text-brand-green dark:text-emerald-300'}`}>
                {service.number}
              </p>
              <h3 className={`mt-7 text-2xl font-bold leading-snug ${service.featured ? 'text-white' : 'text-text-primary dark:text-white'}`}>{service.title}</h3>
              <p className={`mt-6 text-lg leading-7 ${service.featured ? 'font-medium text-white' : 'text-text-secondary'}`}>
                {service.description}
              </p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}

export function WhyBirdhouse() {
  return (
    <section className="bg-surface-primary px-6 py-20 text-text-primary transition-colors duration-300 dark:bg-[#090b0c] dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1104px]">
        <Reveal>
          <SectionLabel>04 / Why Birdhouse Group</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
            We start with your business. Not the technology.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) =>
          <motion.article
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...revealTransition, delay: index * 0.07 }}
            className="border-t border-gray-200 px-4 pt-7 dark:border-zinc-800 sm:min-h-[220px]">

              <h3 className="text-2xl font-bold leading-snug text-text-primary dark:text-white">{reason.title}</h3>
              <p className="mt-5 text-lg leading-7 text-text-secondary">{reason.description}</p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}

export function ConsultationSection() {
  return (
    <section className="bg-surface-secondary px-6 py-20 text-text-primary transition-colors duration-300 dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <Reveal className="mx-auto max-w-[1104px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-16">
          <div>
            <SectionLabel>05 / Turn Insight Into Action</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
              Let&apos;s talk about your 2027.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-text-secondary">
              Bring your assessment results. We&apos;ll discuss your priorities, explore the right approach and agree on
              a practical next step. No pressure to commit.
            </p>
            <button
              type="button"
              onClick={scrollToAssessment}
              className="mt-10 inline-flex rounded-full bg-brand-green px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:bg-[#13a866] dark:hover:bg-emerald-400">

              Start Your Assessment
            </button>
            <p className="mt-10 text-sm text-text-tertiary">Complete the assessment to request your consultation.</p>
          </div>

          <YouTubeShortEmbed className="mx-auto lg:mr-0" />
        </div>
      </Reveal>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="bg-surface-primary px-6 py-20 text-center text-text-primary transition-colors duration-300 dark:bg-[#090b0c] dark:text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <Reveal className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase text-brand-green dark:text-emerald-300">New Year. Better Ways of Working.</p>
        <h2 className="mt-10 text-3xl font-bold leading-tight tracking-[-0.035em] text-text-primary dark:text-white sm:text-5xl">
          Leave the bottlenecks behind.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-text-secondary">
          You don&apos;t have to carry the same problems into another year. Start with a clearer picture of what your
          business needs.
        </p>
        <button
          type="button"
          onClick={scrollToAssessment}
          className="mt-10 w-full rounded-full bg-brand-green px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-greenDark focus:outline-none focus:ring-4 focus:ring-emerald-300/30 dark:bg-[#13a866] dark:hover:bg-emerald-400 sm:w-auto sm:px-10">

          Get Your Free Business Assessment
        </button>
      </Reveal>
    </section>
  );
}
