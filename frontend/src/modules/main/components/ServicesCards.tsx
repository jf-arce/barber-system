"use client";
import { useEffect, useRef, useState } from 'react';

interface ServicesCardsProps {
    services: {
        title: string;
        description: string;
        icon: React.ReactNode;
    }[];
}
export const ServicesCards = ({ services }: ServicesCardsProps) => {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        services.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards(prev => [...prev, index]);
                            }, index * 300); // 300ms de delay entre cada card
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
     
    }, []);

    return (
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`bg-transparent border-2 border-primary rounded-lg p-8 text-center transition-all duration-700 ${
                        visibleCards.includes(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
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
    );
};
