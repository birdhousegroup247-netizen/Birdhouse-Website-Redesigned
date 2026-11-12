import {
  AssessmentSection,
  BusinessChallenges,
  CampaignHero,
  CampaignServices,
  ClosingSection,
  ConsultationSection,
  WhyBirdhouse
} from '../components/business-assessment/BusinessAssessmentSections';

export function BusinessAssessmentPage() {
  return (
    <main className="bg-surface-primary font-sans text-text-primary transition-colors duration-300 dark:bg-[#090b0c]">
      <CampaignHero />
      <BusinessChallenges />
      <AssessmentSection />
      <CampaignServices />
      <WhyBirdhouse />
      <ConsultationSection />
      <ClosingSection />
    </main>
  );
}
