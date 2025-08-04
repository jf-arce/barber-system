"use client";
import { Award, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const barbers = [
    {
        id: 1,
        name: "Alan Martínez",
        specialty: "Coloración y Mechas",
        rating: 4.9,
        image: "/images/barber1.webp",
    },
    {
        id: 2,
        name: "Diego Rodríguez",
        specialty: "Cortes Masculinos",
        rating: 4.8,
        image: "/images/barber2.webp",
    },
    {
        id: 3,
        name: "Martín López",
        specialty: "Peinados y Eventos",
        rating: 4.9,
        image: "/images/barber3.webp",
    },
    {
        id: 4,
        name: "Fernando García",
        specialty: "Peinados y Eventos",
        rating: 4.9,
        image: "/images/barber4.webp",
    },
];

export const BarbersSelection = () => {
    return (
        <section className="animate-fade-up animate-duration-700 animate-delay-400 animate-ease-out">
            <h3 className="text-lg text-black font-bold mb-6 flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Selecciona a tu profesional favorito
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...barbers]
                    .sort((a, b) => b.rating - a.rating)
                    .map((barber) => (
                        <div
                            key={barber.id}
                            className="flex flex-col items-center"
                        >
                            {/* Card cuadrada con imagen de fondo y nombre */}
                            <div
                                className="relative group rounded-md overflow-hidden shadow-md cursor-pointer aspect-square w-full flex flex-col justify-end"
                                style={{ minHeight: 0 }}
                            >
                                <Image
                                    src={barber.image || "/placeholder.svg"}
                                    alt={barber.name}
                                    fill
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 transition-all duration-300" />
                                <div className="absolute bottom-0 left-0 w-full z-20 p-4 flex flex-col items-center">
                                    <h4 className="text-lg font-bold text-white drop-shadow text-center">
                                        {barber.name}
                                    </h4>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-white drop-shadow">
                                            {barber.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Especialidad fuera de la imagen */}
                            <div className="flex flex-col items-center mt-3 w-full">
                                <span className="text-sm text-black font-semibold text-center">
                                    {barber.specialty}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};
