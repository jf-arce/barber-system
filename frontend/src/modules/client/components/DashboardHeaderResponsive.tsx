"use client";
import { LinkButton } from "@/components/LinkButton";
import { useAuthStore } from "@/modules/auth/auth.store";
import { isBarbershopOpen } from "@/utils/isBarbershopOpen";
import { Plus } from "lucide-react";

export const DashboardHeaderResponsive = () => {

  const userAuthenticated = useAuthStore().userAuthenticated;
  const abierto = isBarbershopOpen();

    return (
        <section className="block lg:hidden mb-6">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-black">
                    <div>
                        <h2 className="text-3xl font-bold capitalize">
                            ¡Hola {userAuthenticated?.name.split(" ")[0]}!
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Gestioná tus turnos y servicios de manera simple y
                            rápida.
                        </p>
                    </div>
                    <div>
                        <LinkButton
                            href="/client/appointment"
                            className="!text-black/80 animate-fade-up animate-once animate-duration-700 animate-delay-200"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Reservar una cita
                        </LinkButton>
                    </div>
                </div>
                {/* Estado de la peluquería */}
                <div className="flex items-center gap-3">
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
            </div>
        </section>
    );
};
