"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const AboutHero = () => {
    const [isVisibleHero, setIsVisibleHero] = useState(false);
    const heroImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === heroImageRef.current) {
                            setIsVisibleHero(true);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (heroImageRef.current) observer.observe(heroImageRef.current);

        return () => observer.disconnect();
    }, []);
    return (  
        <div
            ref={heroImageRef}
            className={`relative h-96 lg:h-[500px] transition-all duration-1000 ${
                isVisibleHero
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
            }`}
        >
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                    <Image
                        src={"/images/about-image.webp"}
                        width={6240}
                        height={4160}
                        alt="Imagen de peluquero sobre nosotros"
                        className="h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
