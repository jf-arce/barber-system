import { MainContainer } from "@/components/containers/MainContainer";
import { Footer } from "@/components/layouts/Footer";
import { MainNavbar } from "@/components/layouts/MainNavbar";
import { AboutHero } from "@/modules/about/components/AboutHero";
import { BarbersCards } from "@/modules/about/components/BarbersCards";
import { BarbershopPlace } from "@/modules/about/components/BarbershopPlace";
import { BarberStats } from "@/modules/about/components/BarberStats";

export default function AboutPage() {
    return (
        <div>
            <header className="fixed top-0 left-0 w-full z-50">
                <MainNavbar />
            </header>

            <div className="mt-32 flex items-center">
                <MainContainer>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Sobre{" "}
                                <span className="text-primary">Nosotros</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Somos una barbería con más de 15 años de
                                experiencia, dedicada a ofrecer los mejores
                                servicios de corte y cuidado personal. Nuestro
                                compromiso es brindar un servicio de calidad
                                excepcional en un ambiente cómodo y profesional.
                            </p>
                        </div>
                        <AboutHero />
                    </section>
                    

                    <BarberStats />

                    <section>
                        <div className="text-center my-16">
                            <h2 className="text-4xl font-bold text-white mb-10">
                                Nuestro Equipo
                            </h2>
                            <p className="text-xl text-gray-400">
                                Conoce a los profesionales que harán realidad tu
                                estilo
                            </p>
                        </div>
                        <BarbersCards />
                    </section>

                    <section className="my-16">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-10">
                                Nuestro Lugar
                            </h2>
                            <p className="text-xl text-gray-400 mb-20">
                                Un espacio moderno y cómodo diseñado para tu
                                relajación
                            </p>
                        </div>
                        <BarbershopPlace />
                    </section>
                </MainContainer>
            </div>

            <Footer />
        </div>
    );
}
