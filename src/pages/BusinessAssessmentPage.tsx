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
    <main className="bg-[#090b0c] font-sans">
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
