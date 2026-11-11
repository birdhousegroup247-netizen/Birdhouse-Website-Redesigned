import { motion } from 'framer-motion';

const PARTNERS = [
  {
    name: 'Skin Beauty',
    src: '/images/partners/skin-beauty-logo.png',
    width: 720,
    height: 240
  },
  {
    name: 'Gist Junction',
    src: '/images/partners/gist-junction-logo.png',
    width: 600,
    height: 400
  },
  {
    name: 'Mechux',
    src: '/images/partners/mechux-logo.png',
    width: 720,
    height: 240
  },
  {
    name: 'Prima',
    src: '/images/partners/prima-logo.png',
    width: 720,
    height: 264
  },
  {
    name: 'Ternary Technologies',
    src: '/images/partners/ternary-technologies-logo.png',
    width: 462,
    height: 400
  }
];

export function Partners() {
  return (
    <section className="border-t border-gray-100 bg-surface-secondary py-20 transition-colors dark:border-surface-800 sm:py-24" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-desktop px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>

          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              Trusted collaborations
            </p>
            <h2 id="partners-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Partners
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {PARTNERS.map((partner) =>
            <div
              key={partner.name}
              className="flex min-h-32 items-center justify-center rounded-2xl border border-gray-100 bg-surface-primary p-5 shadow-soft transition-colors dark:border-surface-700 sm:min-h-36 sm:p-6">

                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-20 w-full max-w-48 object-contain" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
