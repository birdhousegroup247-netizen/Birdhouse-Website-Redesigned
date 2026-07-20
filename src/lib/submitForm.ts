export type FormType = 'contact' | 'project-inquiry' | 'job-application';

export async function submitForm(
formType: FormType,
fields: Record<string, string>,
fileUrls?: string[])
: Promise<void> {
  const response = await fetch('/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, fields, fileUrls })
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error || 'Something went wrong sending your submission. Please try again.');
  }
}
