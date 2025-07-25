"use client";
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const LocationSection = () => {
    const [showCards, setShowCards] = useState(false);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowCards(true);
                    }
                });
            },
            { threshold: 0.2 }
        );
        if (cardsRef.current) observer.observe(cardsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="p-16 bg-primary">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 lg:h-full min-h-[400px]">
                        <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9969455150785!2d-58.38414892347168!3d-34.60373637295273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacba98fa2e5%3A0x59ca0e61d84ed6ad!2sAv.%20Corrientes%201234%2C%20C1043%20CABA!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    <div className="space-y-8" ref={cardsRef}>
                        <h2 className="text-4xl font-bold text-black mb-10">
                            Visitanos
                        </h2>
                        <div className={`bg-white/90 rounded-lg p-6 transition-all duration-700 ${showCards ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                            <div className="flex items-center mb-4">
                                <MapPin className="w-6 h-6 text-black mr-3" />
                                <h3 className="text-xl font-semibold text-black">Ubicación</h3>
                            </div>
                            <p className="text-gray-800 mb-4">
                                Av. Corrientes 1234, CABA<br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className={`bg-white/90 rounded-lg p-6 transition-all duration-700 ${showCards ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-16'}`}>
                            <div className="flex items-center mb-4">
                                <Clock className="w-6 h-6 text-black mr-3" />
                                <h3 className="text-xl font-semibold text-black">Horarios</h3>
                            </div>
                            <div className="text-gray-800 space-y-1">
                                <p>Lunes a Viernes: 9:00 - 20:00</p>
                                <p>Sábados: 9:00 - 18:00</p>
                                <p>Domingos: Cerrado</p>
                            </div>
                        </div>

                        <div className={`bg-white/90 rounded-lg p-6 transition-all duration-700 ${showCards ? 'opacity-100 translate-x-0 delay-400' : 'opacity-0 translate-x-16'}`}>
                            <div className="flex items-center mb-4">
                                <Phone className="w-6 h-6 text-black mr-3" />
                                <h3 className="text-xl font-semibold text-black">Contacto</h3>
                            </div>
                            <div className="text-gray-800 space-y-1">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 text-black mr-2" />
                                    <p>+54 11 1234-5678</p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-black mr-2" />
                                    <p>info@barbershop.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};