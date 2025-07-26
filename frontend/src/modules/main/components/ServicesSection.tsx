import { ServicesCards } from './ServicesCards';
import { Scissors, Palette, User } from 'lucide-react';

 const services = [
        {
            icon: <Scissors className="w-12 h-12 text-primary" />,
            title: "Corte de Cabello",
            description: "Cortes modernos y clásicos adaptados a tu estilo personal. Nuestros barberos expertos te ayudarán a encontrar el look perfecto."
        },
        {
            icon: <Palette className="w-12 h-12 text-primary" />,
            title: "Coloración",
            description: "Servicios de coloración profesional, desde tintes completos hasta highlights y balayage para darle vida a tu cabello."
        },
        {
            icon: <User className="w-12 h-12 text-primary" />,
            title: "Arreglo de Barba",
            description: "Perfilado, recorte y cuidado especializado de barba. Incluye tratamientos hidratantes y aceites esenciales."
        }
    ];

export const ServicesSection = () => {
    return (
        <section className="mt-16">
            <div>
                <h2 className="text-4xl font-bold text-center text-white mb-20">
                    Nuestros Servicios
                </h2>
                <ServicesCards services={services} />
            </div>
        </section>
    );
};