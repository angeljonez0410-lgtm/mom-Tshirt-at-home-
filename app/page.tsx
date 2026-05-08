import AIAssistant from "@/components/AIAssistant";
import AIPlatforms from "@/components/AIPlatforms";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
import SneakPeek from "@/components/SneakPeek";
import Solution from "@/components/Solution";
import Testimonials from "@/components/Testimonials";
import Tracking from "@/components/Tracking";
import WhatsInside from "@/components/WhatsInside";

export default function Home() {
  return (
    <div className="bg-[#fffdf8] text-[#181616]">
      <Tracking />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <WhatsInside />
        <SneakPeek />
        <Testimonials />
        <AIPlatforms />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
}
