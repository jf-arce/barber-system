"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const teamMembers = [
    {
        id: 1,
        name: "Alan Martínez",
        specialty: "Cortes de tendencia y fade. Atención personalizada.",
        image: "/images/barber1.webp",
    },
    {
        id: 2,
        name: "Diego Rodríguez",
        specialty:
            "Experto en arreglo de barbas y bigotes. Técnicas tradicionales.",
        image: "/images/barber2.webp",
    },
    {
        id: 3,
        name: "Martín López",
        specialty:
            "Especialista en cortes clásicos y modernos. 10 años de experiencia.",
        image: "/images/barber3.webp",
    },
    {
        id: 4,
        name: "Fernando García",
        specialty:
            "Colorista profesional. Especialidad en coloración, tintes y mechas.",
        image: "/images/barber4.webp",
    },
];

export const BarbersCards = () => {
    const teamRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === teamRef.current) {
                            // Animar las cards una por una con delay
                            teamMembers.forEach((_, index) => {
                                setTimeout(() => {
                                    setVisibleCards((prev) => [...prev, index]);
                                }, index * 200); // 200ms de delay entre cada card
                            });
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (teamRef.current) observer.observe(teamRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={teamRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
        >
            {teamMembers.map((member, index) => (
                <div
                    key={member.id}
                    className={`group relative overflow-hidden bg-gray-800 transition-all duration-700 ${
                        visibleCards.includes(index)
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-8"
                    }`}
                >
                    <div className="relative h-[800px] bg-gradient-to-b from-gray-700 to-gray-800">
                        <Image
                            src={member.image}
                            width={400}
                            height={800}
                            alt={`Foto de ${member.name}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 right-0 p-6">
                            <h3 className="text-white text-center font-bold text-xl mb-2">
                                {member.name}
                            </h3>
                        </div>
                        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 p-6">
                            <p className="text-gray-300 text-lg leading-relaxed text-center">
                                {member.specialty}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
