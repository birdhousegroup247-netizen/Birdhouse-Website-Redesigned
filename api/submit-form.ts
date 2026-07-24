import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { buildNotificationEmail, buildAutoReplyEmail, FormType } from './_lib/email';

interface SubmissionPayload {
  formType: FormType;
  fields: Record<string, string>;
  fileUrls?: string[];
}

const VALID_FORM_TYPES: FormType[] = ['contact', 'project-inquiry', 'job-application'];

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
