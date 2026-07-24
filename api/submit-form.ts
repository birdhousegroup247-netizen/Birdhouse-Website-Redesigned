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
  contact: "We've received your request — Birdhouse Group",
  'project-inquiry': "We've received your request — Birdhouse Group",
  'job-application': "We've received your request — Birdhouse Group"
};

const AUTO_REPLY_MESSAGES: Record<FormType, string> = {
  contact:
  "Thank you for reaching out, your message has been received and we will respond in a short while. Please be patient with us as our response could come within 7-24hrs.",
  'project-inquiry':
  "Thank you for telling us about your project, the details have been received and we will respond in a short while. Please be patient with us as our response could come within 7-24hrs.",
  'job-application':
  "Thank you for applying, your application has been received and we will review it in a short while. Please be patient with us as our response could come within 7-24hrs."
};

const BRAND_GREEN = '#0F9D58';
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
  const firstName = escapeHtml(name?.trim().split(' ')[0] || 'there');
  const year = new Date().getFullYear();

  const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E7EFF1;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <img
              src="https://birdhousegroup.org/images/logo/logo-black.png"
              alt="Birdhouse Group"
              width="160"
              style="display:block;width:160px;height:auto;border:0;outline:none;text-decoration:none;" />
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:32px;">
            <p style="margin:0;font-size:26px;line-height:1.4;color:#18181b;">
              Hi <strong>${firstName}</strong>,<br />
              <strong>we've received your request!</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;">
              <tr>
                <td align="center" style="padding:40px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                    <tr>
                      <td width="56" height="56">
                        <img src="https://birdhousegroup.org/images/email/received-icon.png" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border:0;" />
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 20px;color:#52525b;font-size:15px;line-height:1.6;">
                    ${AUTO_REPLY_MESSAGES[formType]}
                  </p>
                  <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px;" />
                  <p style="margin:0 0 28px;color:#52525b;font-size:15px;line-height:1.6;">
                    You can still scan through our website if there are other services that you'd require, including consultation services.
                  </p>
                  <a
                    href="https://birdhousegroup.org/"
                    style="display:inline-block;background-color:${BRAND_GREEN};color:#ffffff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:999px;text-decoration:none;">
                    Visit Website
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:32px 0 8px;">
            <img src="https://birdhousegroup.org/images/email/social-x.png" width="36" height="36" alt="X" style="display:inline-block;width:36px;height:36px;margin:0 6px;border:0;vertical-align:middle;" />
            <img src="https://birdhousegroup.org/images/email/social-linkedin.png" width="36" height="36" alt="LinkedIn" style="display:inline-block;width:36px;height:36px;margin:0 6px;border:0;vertical-align:middle;" />
            <img src="https://birdhousegroup.org/images/email/social-instagram.png" width="36" height="36" alt="Instagram" style="display:inline-block;width:36px;height:36px;margin:0 6px;border:0;vertical-align:middle;" />
          </td>
        </tr>
        <tr>
          <td align="center" style="color:#71717a;font-size:12px;line-height:1.8;padding-top:8px;">
            Copyright &copy; ${year}<br />
            <strong style="color:#18181b;">Birdhouse Group</strong><br />
            Empowering Businesses with solutions that solve real world problems...
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  return { subject: AUTO_REPLY_SUBJECTS[formType], html };
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
