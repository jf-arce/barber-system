"use client";
import { LinkButton } from "@/core/components/LinkButton";
import { Plus } from "lucide-react";
import React from "react";
import { UserAuthenticated } from "@/modules/auth/auth.types";

interface DashboardHeaderProps {
    userAuthenticated: UserAuthenticated | null;
    abierto: boolean;
}

export const DashboardHeader = ({ userAuthenticated, abierto }: DashboardHeaderProps) => {

    return (
        <>
            <div className="hidden lg:flex justify-between text-black">
                <div>
                    <h2 className="text-3xl font-bold capitalize animate-fade-down animate-once animate-duration-700">
                        ¡Hola {userAuthenticated?.name.split(" ")[0]}!
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Gestioná tus turnos y servicios de manera simple y
                        rápida.
                    </p>
                </div>
                <div>
                    <LinkButton
                        href="/client/appointment/booking"
                        className="!text-black/80"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Reservar una cita
                    </LinkButton>
                </div>
            </div>
            {/* Estado de la peluquería */}
            <div className="hidden lg:flex items-center gap-3 mb-6">
                <span
                    className={`inline-flex items-center py-1 rounded-md text-xs font-semibold ${
                        abierto ? "text-green-700" : "text-red-700"
                    }`}
                >
                    <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                            abierto ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                    {abierto
                        ? "Abierto ahora (8:00 a 18:00)"
                        : "Cerrado ahora (8:00 a 18:00)"}
                </span>
            </div>
        </>
    );
};
