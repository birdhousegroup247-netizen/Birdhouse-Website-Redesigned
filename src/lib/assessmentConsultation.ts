export interface AssessmentConsultationHandoff {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  includesAssessment: boolean;
}

const CONSULTATION_HANDOFF_KEY = 'birdhouse-assessment-consultation-handoff-v1';

export function saveAssessmentConsultationHandoff(handoff: AssessmentConsultationHandoff) {
  try {
    window.sessionStorage.setItem(CONSULTATION_HANDOFF_KEY, JSON.stringify(handoff));
  } catch {
    // Navigation still works if browser storage is unavailable.
  }
}

export function readAssessmentConsultationHandoff(): AssessmentConsultationHandoff | null {
  try {
    const stored = window.sessionStorage.getItem(CONSULTATION_HANDOFF_KEY);
    if (!stored) return null;

    const handoff = JSON.parse(stored) as Partial<AssessmentConsultationHandoff>;
    if (!handoff.name || !handoff.email || !handoff.subject || !handoff.message) return null;

    return {
      name: handoff.name,
      email: handoff.email,
      company: handoff.company || '',
      phone: handoff.phone || '',
      subject: handoff.subject,
      message: handoff.message,
      includesAssessment: handoff.includesAssessment === true
    };
  } catch {
    return null;
  }
}

export function clearAssessmentConsultationHandoff() {
  try {
    window.sessionStorage.removeItem(CONSULTATION_HANDOFF_KEY);
  } catch {
    // There is nothing else to clear if browser storage is unavailable.
  }
}
