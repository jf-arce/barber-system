"use client";
import { Button } from "@/components/Button"
import { BarberServicesService } from "@/modules/barber-services/barber-services.service";
import { Service } from "@/modules/barber-services/services.type";
import { ArrowRight, Scissors } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";

export const RecommendedServices = () => {

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await BarberServicesService.getAll();
  
      setServices(response);
    };

    fetchServices();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-background flex items-center">
          <Scissors className="mr-2 h-5 w-5" />
          Servicios
        </h3>
        <Link href="/services" className="text-background font-semibold hover:underline flex items-center gap-1">
          Ver todos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {services.slice(0, 4).map((service, idx) => (
          <div
            key={service.id}
            className={`rounded-sm bg-gray-100/40 border border-primary hover:bg-primary/50 transition-all cursor-pointer group animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${idx * 120}ms]`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-black group-hover:text-black transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-500">1hs</p>
                  </div>
                  <span className="text-md font-medium text-black">desde ${service.price}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="tertiary"
                    className="border-black/20 text-black bg-white/40 hover:bg-primary/20"
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
