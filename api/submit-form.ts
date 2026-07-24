import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type FormType = 'contact' | 'project-inquiry' | 'job-application';

interface SubmissionPayload {
  formType: FormType;
  fields: Record<string, string>;
  fileUrls?: string[];
}

const VALID_FORM_TYPES: FormType[] = ['contact', 'project-inquiry', 'job-application'];

const NOTIFY_SUBJECTS: Record<FormType, string> = {
  contact: 'New contact form submission',
  'project-inquiry': 'New project inquiry',
  'job-application': 'New job application'
};

const NOTIFY_HEADINGS: Record<FormType, string> = {
  contact: 'New Contact Form Submission',
  'project-inquiry': 'New Project Inquiry',
  'job-application': 'New Job Application'
};

const AUTO_REPLY_SUBJECTS: Record<FormType, string> = {
  contact: "We've received your message — Birdhouse Group",
  'project-inquiry': "We've received your project — Birdhouse Group",
  'job-application': "We've received your application — Birdhouse Group"
};

const AUTO_REPLY_MESSAGES: Record<FormType, string> = {
  contact: "Thanks for reaching out. We've received your message and will get back to you within 24 hours.",
  'project-inquiry':
  "Thanks for telling us about your project. We've received the details and will be in touch shortly to discuss next steps.",
  'job-application':
  "Thanks for applying. We've received your application and will review it shortly — we'll reach out if there's a good fit."
};

const BRAND_GREEN_DARK = '#0B7A44';

function escapeHtml(value: string): string {
  return value.
  replace(/&/g, '&amp;').
  replace(/</g, '&lt;').
  replace(/>/g, '&gt;').
  replace(/"/g, '&quot;');
}

function emailShell(bodyHtml: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr>
          <td style="background-color:#18181B;padding:24px 32px;">
            <img
              src="https://birdhousegroup.org/images/logo/logo-white.png"
              alt="Birdhouse Group"
              width="140"
              style="display:block;width:140px;height:auto;border:0;outline:none;text-decoration:none;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;color:#27272a;font-size:15px;line-height:1.6;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background-color:#fafafa;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Birdhouse Group. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function buildNotificationEmail(
formType: FormType,
fields: Record<string, string>,
fileUrls?: string[])
: {subject: string;html: string;} {
  const rows = Object.entries(fields).
  map(
    ([key, value]) =>
    `<tr>
        <td style="padding:8px 16px 8px 0;font-weight:600;color:#52525b;vertical-align:top;white-space:nowrap;">${escapeHtml(key)}</td>
        <td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(value || '-')}</td>
      </tr>`
  ).
  join('');

  const filesHtml = fileUrls?.length ?
  `<p style="margin:24px 0 8px;font-weight:600;color:#52525b;">Attachments</p>
     <ul style="margin:0;padding-left:20px;">
       ${fileUrls.map((url) => `<li style="margin-bottom:4px;"><a href="${url}" style="color:${BRAND_GREEN_DARK};">${escapeHtml(url)}</a></li>`).join('')}
     </ul>` :
  '';

  const body = `
    <h1 style="margin:0 0 20px;font-size:20px;color:#111111;">${NOTIFY_HEADINGS[formType]}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">${rows}</table>
    ${filesHtml}`;

  return { subject: NOTIFY_SUBJECTS[formType], html: emailShell(body) };
}

function buildAutoReplyEmail(formType: FormType, name?: string): {subject: string;html: string;} {
  const firstName = name?.trim().split(' ')[0] || 'there';
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#111111;">Hi ${escapeHtml(firstName)},</h1>
    <p style="margin:0 0 16px;">${AUTO_REPLY_MESSAGES[formType]}</p>
    <p style="margin:0;">— The Birdhouse Group Team</p>`;

  return { subject: AUTO_REPLY_SUBJECTS[formType], html: emailShell(body) };
}

export const config = {
  maxDuration: 30
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyTo = process.env.NOTIFY_EMAIL_TO;
    const fromAddress = process.env.NOTIFY_EMAIL_FROM || smtpUser;

    if (!smtpUser || !smtpPass || !notifyTo) {
      res.status(500).json({ error: 'Email notifications are not configured on the server.' });
      return;
    }

    const { formType, fields, fileUrls } = (req.body || {}) as Partial<SubmissionPayload>;

    if (!formType || !fields || !VALID_FORM_TYPES.includes(formType)) {
      res.status(400).json({ error: 'Missing or invalid form data.' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000
    });

    try {
      const { subject, html } = buildNotificationEmail(formType, fields, fileUrls);
      await transporter.sendMail({ from: fromAddress, to: notifyTo, subject, html });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'Failed to send notification email.' });
      return;
    }

    if (fields.email) {
      try {
        const { subject, html } = buildAutoReplyEmail(formType, fields.name);
        await transporter.sendMail({ from: fromAddress, to: fields.email, subject, html });
      } catch (err) {
        // The critical notification already succeeded; a failed auto-reply
        // shouldn't fail the whole submission for the person filling the form.
        console.error('Failed to send auto-reply email:', err);
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unhandled error in submit-form:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unexpected server error.' });
  }
}
