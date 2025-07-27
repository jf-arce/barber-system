"use client";
import { Button } from "@/components/Button"
import { ArrowRight, Scissors } from "lucide-react"
import Link from "next/link"

const services = [
  { id: 1, name: "Corte Clásico", description: "Corte tradicional con tijera y máquina.", price: 3500 },
  { id: 2, name: "Corte + Barba", description: "Corte de pelo y perfilado de barba.", price: 5000 },
  { id: 3, name: "Afeitado Premium", description: "Afeitado a navaja con toalla caliente.", price: 4000 },
  { id: 4, name: "Coloración", description: "Coloración profesional para cabello o barba.", price: 6000 },
  { id: 5, name: "Tratamiento Capilar", description: "Tratamiento hidratante y revitalizante.", price: 4500 },
];

export const RecommendedServices = () => {
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
