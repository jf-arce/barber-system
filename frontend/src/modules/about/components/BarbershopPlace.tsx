"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const BarbershopPlace = () => {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const imageRef1 = useRef<HTMLDivElement>(null);
    const imageRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === imageRef1.current) {
                            setIsVisible1(true);
                        }
                        if (entry.target === imageRef2.current) {
                            setIsVisible2(true);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (imageRef1.current) observer.observe(imageRef1.current);
        if (imageRef2.current) observer.observe(imageRef2.current);

        return () => observer.disconnect();
    }, []);
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Diseño <span className="text-primary">Moderno</span>
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Nuestro local cuenta con un diseño contemporáneo que
                        combina la elegancia clásica de las barberías
                        tradicionales con toques modernos y tecnológicos.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Cada rincón ha sido cuidadosamente diseñado para crear
                        un ambiente relajante donde puedas desconectar del día a
                        día mientras cuidamos tu imagen.
                    </p>
                </div>

                <div
                    ref={imageRef1}
                    className={`relative transition-all duration-1000 ${
                        isVisible1
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-8"
                    }`}
                >
                    <div className="transform transition-all duration-500">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/about-place.webp"
                                width={1200}
                                height={736}
                                alt="Interior moderno de la barbería"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                    ref={imageRef2}
                    className={`relative order-2 lg:order-1 transition-all duration-1000 ${
                        isVisible2
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-8"
                    }`}
                >
                    <div className="transform transition-all duration-500">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/about-place2.webp"
                                width={1200}
                                height={736}
                                alt="Zona de espera cómoda"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Comodidad <span className="text-primary">Total</span>
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Contamos con una zona de espera equipada con cómodos
                        sillones, música ambiente y todas las comodidades para
                        que tu visita sea una experiencia única.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Nuestro equipo y herramientas son de la más alta
                        calidad, garantizando resultados profesionales en cada
                        servicio que brindamos.
                    </p>
                </div>
            </div>
        </div>
    );
};
