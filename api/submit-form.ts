import type { VercelRequest, VercelResponse } from '@vercel/node';

type FormType = 'contact' | 'project-inquiry' | 'job-application';

interface SubmissionPayload {
  formType: FormType;
  fields: Record<string, string>;
  fileUrls?: string[];
}

const SUBJECTS: Record<FormType, string> = {
  contact: 'New contact form submission',
  'project-inquiry': 'New project inquiry',
  'job-application': 'New job application'
};

function escapeHtml(value: string): string {
  return value.
  replace(/&/g, '&amp;').
  replace(/</g, '&lt;').
  replace(/>/g, '&gt;').
  replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL_TO;
  const fromAddress = process.env.NOTIFY_EMAIL_FROM || 'Birdhouse Website <onboarding@resend.dev>';

  if (!resendApiKey || !notifyTo) {
    res.status(500).json({ error: 'Email notifications are not configured on the server.' });
    return;
  }

  const { formType, fields, fileUrls } = (req.body || {}) as Partial<SubmissionPayload>;

  if (!formType || !fields || !SUBJECTS[formType]) {
    res.status(400).json({ error: 'Missing or invalid form data.' });
    return;
  }

  const rows = Object.entries(fields).
  map(
    ([key, value]) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(key)}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(value || '-')}</td></tr>`
  ).
  join('');

  const filesHtml = fileUrls?.length ?
  `<p><strong>Attachments:</strong></p><ul>${fileUrls.map((url) => `<li><a href="${url}">${escapeHtml(url)}</a></li>`).join('')}</ul>` :
  '';

  const html = `<table>${rows}</table>${filesHtml}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: notifyTo,
        subject: SUBJECTS[formType],
        html
      })
    });

    if (!response.ok) {
      const detail = await response.json().catch(() => null);
      res.status(502).json({ error: detail?.message || 'Failed to send notification email.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : 'Failed to send notification email.' });
  }
}
