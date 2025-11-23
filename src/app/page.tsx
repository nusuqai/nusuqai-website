import CTA from "@/components/Home/CTA";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServicesSection } from "@/components/Home/Services";
import FAQSection from "@/components/Home/FAQSection";
import UseCases from "@/components/Home/UseCases/UseCases";
import PortfolioShowcase from "@/components/Home/Portfolio";
import TestimonialsSection from "@/components/Home/Testemonials";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <UseCases />
      <PortfolioShowcase />
      <TestimonialsSection />      
      <FAQSection />
      <CTA />
    </main>
  );
}