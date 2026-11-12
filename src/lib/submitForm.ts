export type FormType = 'contact' | 'project-inquiry' | 'job-application';

export type DeliveryStatus = 'not-sent' | 'unknown';

export class FormSubmissionError extends Error {
  deliveryStatus: DeliveryStatus;

  constructor(message: string, deliveryStatus: DeliveryStatus) {
    super(message);
    this.name = 'FormSubmissionError';
    this.deliveryStatus = deliveryStatus;
  }
}

export async function submitForm(
formType: FormType,
fields: Record<string, string>,
fileUrls?: string[])
: Promise<void> {
  let response: Response;
  try {
    response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, fields, fileUrls })
    });
  } catch {
    throw new FormSubmissionError(
      'We could not confirm whether your message was delivered. To avoid sending it twice, please do not submit it again right now.',
      'unknown'
    );
  }

  if (!response.ok) {
    const detail = await response.json().catch(() => null) as {
      error?: string;
      deliveryStatus?: DeliveryStatus;
    } | null;
    const deliveryStatus = detail?.deliveryStatus ||
    (response.status >= 500 || response.status === 408 ? 'unknown' : 'not-sent');
    throw new FormSubmissionError(
      detail?.error || (deliveryStatus === 'unknown' ?
      'We could not confirm whether your message was delivered. To avoid sending it twice, please do not submit it again right now.' :
      'Something went wrong sending your submission. Please try again.'),
      deliveryStatus
    );
  }
}
