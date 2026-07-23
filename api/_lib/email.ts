export type FormType = 'contact' | 'project-inquiry' | 'job-application';

const BRAND_GREEN = '#0F9D58';
const BRAND_GREEN_DARK = '#0B7A44';

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

export function escapeHtml(value: string): string {
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
          <td style="background-color:#111111;padding:24px 32px;">
            <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Birdhouse <span style="color:${BRAND_GREEN};">Group</span></span>
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

export function buildNotificationEmail(
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

export function buildAutoReplyEmail(formType: FormType, name?: string): {subject: string;html: string;} {
  const firstName = name?.trim().split(' ')[0] || 'there';
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#111111;">Hi ${escapeHtml(firstName)},</h1>
    <p style="margin:0 0 16px;">${AUTO_REPLY_MESSAGES[formType]}</p>
    <p style="margin:0;">— The Birdhouse Group Team</p>`;

  return { subject: AUTO_REPLY_SUBJECTS[formType], html: emailShell(body) };
}
