"use client";
import Link from "next/link"
import { isBarbershopOpen } from "@/core/utils/isBarbershopOpen";
import { ScissorsIcon, ArrowRightIcon } from "@/core/components/Icons";
import { BarbersSelection } from "@/modules/client-panel/dashboard/components/BarbersSelection";
import { NextAppointment } from "@/modules/client-panel/dashboard/components/NextAppointment";
import { AppointmentsHistory } from "@/modules/client-panel/dashboard/components/AppointmentsHistory";
import { DashboardHeader } from "@/modules/client-panel/dashboard/components/DashboardHeader";
import { DashboardHeaderResponsive } from "@/modules/client-panel/dashboard/components/DashboardHeaderResponsive";
import { GetService } from "@/modules/services/services.type";
import { useAuthStore } from "@/modules/auth/auth.store";
import ServiceBookingCard from "@/modules/services/components/ServiceBookingCard";
import { Suspense } from "react";

interface ClientDashboardScreenProps {
  services: GetService[]; // Adjust type as necessary
}

export const ClientDashboardScreen = ({ services }: ClientDashboardScreenProps) => {

  const userAuthenticated = useAuthStore().userAuthenticated;
  const abierto = isBarbershopOpen();

  return (
    <div className="pt-10 pb-20 min-h-screen">

      <DashboardHeaderResponsive
        userAuthenticated={userAuthenticated}
        abierto={abierto}
      />

      <section className="flex flex-col-reverse lg:flex-row gap-8 min-h-[calc(100vh-200px)]">

        <div className="lg:w-2/3 w-full space-y-4">

          <DashboardHeader
            userAuthenticated={userAuthenticated}
            abierto={abierto}
          />

          <Suspense fallback={<p>Cargando servicios...</p>}>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-background flex items-center">
                  <ScissorsIcon className="mr-2 h-5 w-5" />
                  Servicios
                </h3>
                <Link href="/services" className="text-background font-semibold hover:underline flex items-center gap-1">
                  Ver todos <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {services.slice(0, 4).map((service, idx) => (
                  <ServiceBookingCard
                    key={service.id}
                    service={service}
                    className={`animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${idx * 120}ms]`}
                  />
                ))}
              </div>
            </section>
          </Suspense>

          <BarbersSelection />

        </div>

        <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
          <div className="sticky top-8">

            <NextAppointment />

            <AppointmentsHistory />

          </div>
        </div>

      </section>

    </div>
  )
}
