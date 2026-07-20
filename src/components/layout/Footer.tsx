import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Dribbble, Instagram } from 'lucide-react';
interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}
interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
const COLUMNS: FooterColumn[] = [
{
  heading: 'Studio',
  links: [
  { label: 'Home', to: '/' },
  { label: 'About', href: '#' },
  { label: 'Work', to: '/work' },
  { label: 'Products', to: '/products' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' }]

},
{
  heading: 'Services',
  links: [
  { label: 'All Services', to: '/services' },
  { label: 'Product Design', to: '/services' },
  { label: 'Web Development', to: '/services' },
  { label: 'Mobile Apps', to: '/services' },
  { label: 'Design Systems', to: '/services' }]

}];

function XLogo({ className = '' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>);

}

const SOCIAL_LINKS = [
{ label: 'X (Twitter)', icon: XLogo, href: '#' },
{ label: 'LinkedIn', icon: Linkedin, href: '#' },
{ label: 'Dribbble', icon: Dribbble, href: '#' },
{ label: 'Instagram', icon: Instagram, href: '#' }];

function FooterLinkItem({ link }: {link: FooterLink;}) {
  const className = 'hover:text-brand-green transition-colors';
  if (link.to) {
    return (
      <Link to={link.to} className={className}>
        {link.label}
      </Link>);

  }
  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>);

}
export function Footer() {
  return (
    <footer className="bg-surface-primary border-t border-gray-100 dark:border-surface-800 py-14 sm:py-20">
      <div className="max-w-desktop mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-12 gap-x-6 gap-y-10 sm:gap-12 mb-14 sm:mb-20">
          <div className="col-span-2 sm:col-span-4">
            <Link to="/" className="flex items-center mb-8">
              <img
                src="/images/logo/logo-black.png"
                alt="Birdhouse"
                className="h-8 w-auto dark:hidden" />

              <img
                src="/images/logo/logo-white.png"
                alt="Birdhouse"
                className="h-8 w-auto hidden dark:block" />

            </Link>
            <p className="text-text-secondary mb-8 max-w-sm">
              A premium digital product design and software development studio
              based in San Francisco.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Email us"
                className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary hover:bg-brand-green hover:text-white transition-colors">

                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col, idx) =>
          <div
            key={col.heading}
            className={`col-span-1 sm:col-span-2 ${idx === 0 ? 'sm:col-start-7' : ''}`}>

              <h4 className="font-semibold mb-6">{col.heading}</h4>
              <ul className="space-y-4 text-text-secondary">
                {col.links.map((link) =>
              <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
              )}
              </ul>
            </div>
          )}

          <div className="col-span-2 sm:col-span-2">
            <h4 className="font-semibold mb-6">Social</h4>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) =>
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-surface-700 flex items-center justify-center text-text-secondary hover:text-brand-green hover:border-brand-green transition-colors">

                  <Icon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between pt-8 border-t border-gray-100 dark:border-surface-800 text-sm text-text-tertiary text-center sm:text-left">
          <p>© {new Date().getFullYear()} Birdhouse Group. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8">
            <a href="#" className="hover:text-text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}
