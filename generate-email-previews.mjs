import { buildNotificationEmail, buildAutoReplyEmail } from './api/_lib/email.ts';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('./email-previews', { recursive: true });

const samples = {
  contact: {
    fields: {
      name: 'Jane Doe',
      email: 'jane@company.com',
      subject: 'Question about your services',
      message: "Hi, I'd love to learn more about your product design offering. Do you have availability next month?"
    }
  },
  'project-inquiry': {
    fields: {
      name: 'Jane Doe',
      email: 'jane@company.com',
      phone: '+1 (555) 000-0000',
      category: 'SaaS Product',
      message: 'We want to build a subscription analytics dashboard for our B2B customers.'
    },
    fileUrls: ['https://res.cloudinary.com/demo/raw/upload/birdhouse-uploads/sample-brief.pdf']
  },
  'job-application': {
    fields: {
      role: 'QA Tester',
      name: 'Jane Doe',
      email: 'jane@company.com',
      phone: '+1 (555) 000-0000',
      portfolio: 'linkedin.com/in/janedoe',
      message: "I've been doing manual and automated QA for 4 years and would love to join the team."
    },
    fileUrls: ['https://res.cloudinary.com/demo/raw/upload/birdhouse-uploads/jane-doe-resume.pdf']
  }
};

for (const [formType, { fields, fileUrls }] of Object.entries(samples)) {
  const notify = buildNotificationEmail(formType, fields, fileUrls);
  writeFileSync(`./email-previews/notification-${formType}.html`, notify.html);

  const reply = buildAutoReplyEmail(formType, fields.name);
  writeFileSync(`./email-previews/autoreply-${formType}.html`, reply.html);
}

console.log('Generated 6 preview files in ./email-previews');
