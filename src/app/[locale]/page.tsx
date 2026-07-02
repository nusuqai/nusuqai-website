import CTA from "@/components/Home/CTA";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServicesSection } from "@/components/Home/Services";
import FAQSection from "@/components/Home/FAQSection";
import UseCases from "@/components/Home/UseCases/UseCases";
import PortfolioShowcase from "@/components/Home/Portfolio";
import TestimonialsSection from "@/components/Home/Testemonials";
import AboutSection from "@/components/Home/Aboutus";
import ProcessSection from "@/components/Home/ProcessSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioShowcase />
      <UseCases />
      <AboutSection />      
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <CTA />
    </main>
  );
}