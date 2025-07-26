"use client";
import Link from "next/link";
import { Scissors, User, Brush, Clock, ArrowRight, Users, Plus, Calendar, CheckCircle, AlertCircle, Award, Star, X, History, RotateCcw } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { useAuthStore } from "@/modules/auth/auth.store";
import { Button } from "@/components/Button";
import Image from "next/image";

const services = [
  { id: 1, name: "Corte Clásico", description: "Corte tradicional con tijera y máquina.", price: 3500, icon: <Scissors className="w-8 h-8 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-transform" /> },
  { id: 2, name: "Corte + Barba", description: "Corte de pelo y perfilado de barba.", price: 5000, icon: <User className="w-8 h-8 text-amber-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform" /> },
  { id: 3, name: "Afeitado Premium", description: "Afeitado a navaja con toalla caliente.", price: 4000, icon: <Brush className="w-8 h-8 text-rose-500 group-hover:scale-110 group-hover:rotate-12 transition-transform" /> },
  { id: 4, name: "Coloración", description: "Coloración profesional para cabello o barba.", price: 6000, icon: <Brush className="w-8 h-8 text-fuchsia-500 group-hover:scale-110 group-hover:-rotate-12 transition-transform" /> },
  { id: 5, name: "Tratamiento Capilar", description: "Tratamiento hidratante y revitalizante.", price: 4500, icon: <Users className="w-8 h-8 text-green-500 group-hover:scale-110 group-hover:rotate-3 transition-transform" /> },
];


const currentAppointment = {
  status: true,
  service: "Corte + Barba",
  date: "2025-07-28 17:00",
  barber: "Juan Pérez",
  price: 16000
};


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
]

const historyData = [
  {
    service: "Corte y Barba",
    date: "20 Dic 2023",
    time: "14:00",
    price: 3500,
    rating: 5,
  },
  {
    service: "Coloración",
    date: "15 Nov 2023",
    time: "16:30",
    price: 6000,
    rating: 5,
  },
  {
    service: "Afeitado Premium",
    date: "10 Oct 2023",
    time: "13:00",
    price: 4000,
    rating: 4,
  },
];

function isBarbershopOpen() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 18;
}

export default function ClientDashboardPage() {

  const userAuthenticated = useAuthStore().userAuthenticated;
  const abierto = isBarbershopOpen();

  return (
    <div className="pt-10 pb-20 min-h-screen">
      {/* Estado de la peluquería */}

      {/* Header, button, and open/closed indicator always on top in mobile, in left column on desktop */}
      <div className="block lg:hidden mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-black">
            <div>
              <h2 className="text-3xl font-bold capitalize">¡Hola {userAuthenticated?.name.split(" ")[0]}!</h2>
              <p className="text-gray-500 mt-1">Gestioná tus turnos y servicios de manera simple y rápida.</p>
            </div>
            <div>
              <LinkButton
                href="/client/appointments"
                className="!text-black/80 animate-fade-up animate-once animate-duration-700 animate-delay-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Reservar una cita
              </LinkButton>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center py-1 rounded-md text-xs font-semibold ${abierto ? 'text-green-700' : 'text-red-700'}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${abierto ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {abierto ? 'Abierto ahora (8:00 a 18:00)' : 'Cerrado ahora (8:00 a 18:00)'}
            </span>
          </div>
        </div>
      </div>

      {/* Responsive: flex-col-reverse for mobile, flex-row for desktop */}
      <div className="flex flex-col-reverse lg:flex-row gap-8 min-h-[calc(100vh-200px)]">
        {/* Columna Izquierda - Servicios y Profesionales */}
        <div className="lg:w-2/3 w-full space-y-4">
          {/* Header con botón de reserva (solo desktop) */}
          <div className="hidden lg:flex justify-between text-black">
            <div>
              <h2 className="text-3xl font-bold capitalize">¡Hola {userAuthenticated?.name.split(" ")[0]}!</h2>
              <p className="text-gray-500 mt-1">Gestioná tus turnos y servicios de manera simple y rápida.</p>
            </div>
            <div>
              <LinkButton
                href="/client/appointments"
                className="!text-black/80 animate-fade-up animate-once animate-duration-700 animate-delay-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Reservar una cita
              </LinkButton>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center py-1 rounded-md text-xs font-semibold ${abierto ? 'text-green-700' : 'text-red-700'}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${abierto ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {abierto ? 'Abierto ahora (8:00 a 18:00)' : 'Cerrado ahora (8:00 a 18:00)'}
            </span>
          </div>

          {/* Servicios Recomendados */}
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
              {services.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  className="rounded-sm bg-gray-100/40 border border-primary hover:bg-primary/50 transition-all cursor-pointer group"
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

          {/* Profesionales */}
          <section>
            <h3 className="text-lg text-black font-bold mb-6 flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Selecciona a tu profesional favorito
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...barbers].sort((a, b) => b.rating - a.rating).map((barber) => (
                <div key={barber.id} className="flex flex-col items-center">
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
                      <h4 className="text-lg font-bold text-white drop-shadow text-center">{barber.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-white drop-shadow">{barber.rating}</span>
                      </div>
                    </div>
                  </div>
                  {/* Especialidad fuera de la imagen */}
                  <div className="flex flex-col items-center mt-3 w-full">
                    <span className="text-sm text-black font-semibold text-center">{barber.specialty}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha - Próxima Cita */}
        <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
          <div className="sticky top-8">
            {currentAppointment.status ? (
              <div className="rounded-md bg-gray-100 shadow-xl">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-black flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-black" />
                        Tu Próxima Cita
                      </h3>
                      <CheckCircle className="w-7 h-7 text-green-600 flex" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-black mb-2">{currentAppointment.service}</h4>
                        <p className="text-gray-700 flex items-center">
                          <User className="mr-2 h-4 w-4 text-black" />
                          con {currentAppointment.barber}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-500/40">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center">
                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary mb-2">
                              <Calendar className="h-6 w-6 text-primary" />
                            </span>
                            <p className="text-xs text-gray-700 font-semibold">Fecha</p>
                            <p className="font-bold text-black text-base">15 Enero</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center">
                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary mb-2">
                              <Clock className="h-6 w-6 text-primary" />
                            </span>
                            <p className="text-xs text-gray-700 font-semibold">Hora</p>
                            <p className="font-bold text-black text-base">14:30</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Precio</p>
                          <p className="text-2xl font-bold text-black">${currentAppointment.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-700">Duración</p>
                          <p className="font-semibold text-black">1hs</p>
                        </div>
                      </div>

                      <div className="bg-primary/20 rounded-lg p-4 border border-primary">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-4 w-4 text-amber-950 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-gray-800">
                            <p className="text-amber-950 font-medium mb-1">Recordatorio:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Llega 10 min antes.</li>
                              <li>Cancelaciones tardías se cobran completas.</li>
                              <li>Las reprogramaciones solo pueden realizarse hasta 24hs antes de la cita.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button
                          className="bg-neutral-600 text-black hover:bg-neutral-500"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reprogramar
                        </Button>
                        <Button
                          className="bg-red-700 hover:bg-red-600 text-white"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 border-gray-300">
                <div className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes citas programadas</h3>
                  <p className="text-gray-600 mb-6">¡Reserva tu próxima cita y luce increíble!</p>
                  <Button className="!text-black/80">
                    <Plus className="mr-2 h-4 w-4" />
                    Reservar Ahora
                  </Button>
                </div>
              </div>
            )}

            {/* Historial Compacto */}
            <div className="bg-gray-100 shadow-xl mt-6 rounded-sm">
              <div className="p-4">
                <h4 className="text-sm font-medium text-black mb-3 flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  Historial Reciente
                </h4>
                <div className="space-y-3">
                  {historyData.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-black font-semibold">{item.service}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>·</span>
                          <span>{item.time}</span>
                          <span>·</span>
                          <span className="text-black/80 font-bold">${item.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-3 !text-black/80">
                  Ver todo el historial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
