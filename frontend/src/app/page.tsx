import { MainContainer } from "@/core/containers/MainContainer";
import { Divider } from "@/core/components/Divider";
import { Footer } from "@/core/layouts/Footer";
import { AboutSection } from "@/modules/main/components/AboutSection";
import { Hero } from "@/modules/main/components/Hero";
import { LocationSection } from "@/modules/main/components/LocationSection";
import { MainNavbar } from "@/core/layouts/MainNavbar";
import { ServicesSection } from "@/modules/main/components/ServicesSection";

export default function Home() {
  return (
    <div>
      <section className="relative h-dvh">
        <header className="fixed top-0 left-0 w-full z-50">
          <MainNavbar />
        </header>
        <Hero />
      </section>

      <MainContainer>  
        <ServicesSection />
        <Divider />   
        <AboutSection />
      </MainContainer>
      <LocationSection />

      <Footer />
    </div>
  );
}
