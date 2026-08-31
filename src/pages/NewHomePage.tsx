import React from 'react';
import { TopNav } from '../sections/TopNav';
import { Hero } from '../sections/Hero';
import { EmotionalSection } from '../sections/EmotionalSection';
import { Benefits } from '../sections/Benefits';
import { Simulator } from '../sections/Simulator';
import { ComparisonSection } from '../sections/ComparisonSection';
import { VoiceTestimonialSection } from '../sections/VoiceTestimonialSection';
import { LeadForm } from '../sections/LeadForm';
import { Footer } from '../sections/Footer';
import { goToTally, COPY } from '../constants';

export function NewHomePage() {
  return (
    <div className="thp">
      <TopNav cta={COPY.cta} onCTA={goToTally} />
      <Hero headline={COPY.headline} cta={COPY.cta} onCTA={goToTally} />
      <EmotionalSection />
      <Benefits />
      <Simulator onCTA={goToTally} />
      <ComparisonSection />
      <VoiceTestimonialSection />
      <LeadForm cta={COPY.cta} />
      <Footer />
    </div>
  );
}
