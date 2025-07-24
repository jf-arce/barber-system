import { Scissors, Palette, User } from 'lucide-react';

export const ServicesSection = () => {
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

    return (
        <section className="mt-16">
            <div>
                <h2 className="text-4xl font-bold text-center text-white mb-20">
                    Nuestros Servicios
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="bg-transparent border-2 border-primary rounded-lg p-8 text-center hover:bg-primary/10 transition-all duration-300"
                        >
                            <div className="flex justify-center mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};