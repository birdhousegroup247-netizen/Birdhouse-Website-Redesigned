import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
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
  { label: 'About', href: '#' },
  { label: 'Work', to: '/work' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#' }]

},
{
  heading: 'Services',
  links: [
  { label: 'Product Design', to: '/services' },
  { label: 'Web Development', to: '/services' },
  { label: 'Mobile Apps', to: '/services' },
  { label: 'Design Systems', to: '/services' }]

},
{
  heading: 'Social',
  links: [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Instagram', href: '#' }]

}];

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
    <footer className="bg-white border-t border-gray-100 py-20">
      <div className="max-w-desktop mx-auto px-12">
        <div className="grid grid-cols-12 gap-12 mb-20">
          <div className="col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Birdhouse
              </span>
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
            className={`col-span-2 ${idx === 0 ? 'col-start-7' : ''}`}>

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
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100 text-sm text-text-tertiary">
          <p>© 2026 Birdhouse Group. All rights reserved.</p>
          <div className="flex gap-8">
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
