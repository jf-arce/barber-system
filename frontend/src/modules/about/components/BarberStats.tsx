"use client";
import { useEffect, useRef, useState } from "react";

export const BarberStats = () => {
    const [yearsCount, setYearsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [barbersCount, setBarbersCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const statsRef = useRef<HTMLDivElement>(null);

    // Number animation function
    const animateCount = (
        start: number,
        end: number,
        duration: number,
        setCount: (value: number) => void
    ) => {
        const increment = end / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === statsRef.current && !hasAnimated) {
                            setHasAnimated(true);
                            animateCount(0, 15, 2000, setYearsCount);
                            animateCount(0, 1000, 2500, setClientsCount);
                            animateCount(0, 4, 1500, setBarbersCount);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) observer.observe(statsRef.current);

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section
            ref={statsRef}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <div className="text-4xl font-bold text-primary mb-2">
                    {yearsCount}+
                </div>
                <p className="text-gray-300">Años de Experiencia</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <div className="text-4xl font-bold text-primary mb-2">
                    {clientsCount}+
                </div>
                <p className="text-gray-300">Clientes Satisfechos</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <div className="text-4xl font-bold text-primary mb-2">
                    {barbersCount}
                </div>
                <p className="text-gray-300">Barberos Profesionales</p>
            </div>
        </section>
    );
};
