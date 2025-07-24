import { MainContainer } from "@/components/containers/MainContainer";
import { Divider } from "@/components/Divider";
import { AboutSection } from "@/modules/main/components/AboutSection";
import { Hero } from "@/modules/main/components/Hero";
import { LocationSection } from "@/modules/main/components/LocationSection";
import { MainNavbar } from "@/modules/main/components/MainNavbar";
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
        <Divider /> 
        <LocationSection />
      </MainContainer>

      <footer className="bg-background py-10 text-center">
        <p className="text-gray-500">© 2023 BarberLP. Todos los derechos reservados.</p>
        <p className="text-gray-500">Desarrollado por [Tu Nombre]</p>
        <p className="text-gray-500">Powered by Next.js</p>
      </footer>
    </div>
  );
}
