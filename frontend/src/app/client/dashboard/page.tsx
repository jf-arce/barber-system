"use client";
import Link from "next/link";
import { Scissors, User, CalendarCheck, Brush, Clock, ArrowRight, Users, PlusCircle, UserCircle2 } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";

const services = [
  { id: 1, name: "Corte Clásico", description: "Corte tradicional con tijera y máquina.", price: 3500, icon: <Scissors className="w-8 h-8 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-transform" /> },
  { id: 2, name: "Corte + Barba", description: "Corte de pelo y perfilado de barba.", price: 5000, icon: <User className="w-8 h-8 text-amber-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform" /> },
  { id: 3, name: "Afeitado Premium", description: "Afeitado a navaja con toalla caliente.", price: 4000, icon: <Brush className="w-8 h-8 text-rose-500 group-hover:scale-110 group-hover:rotate-12 transition-transform" /> },
  { id: 4, name: "Coloración", description: "Coloración profesional para cabello o barba.", price: 6000, icon: <Brush className="w-8 h-8 text-fuchsia-500 group-hover:scale-110 group-hover:-rotate-12 transition-transform" /> },
  { id: 5, name: "Tratamiento Capilar", description: "Tratamiento hidratante y revitalizante.", price: 4500, icon: <Users className="w-8 h-8 text-green-500 group-hover:scale-110 group-hover:rotate-3 transition-transform" /> },
];


const barbers = [
  { id: 1, name: "Juan Pérez", specialty: "Fade y corte clásico", icon: <UserCircle2 className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" /> },
  { id: 2, name: "María López", specialty: "Barba y afeitado", icon: <UserCircle2 className="w-10 h-10 text-pink-500 group-hover:scale-110 transition-transform" /> },
  { id: 3, name: "Carlos Gómez", specialty: "Coloración y tratamientos", icon: <UserCircle2 className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform" /> },
];

const currentAppointment = {
  exists: true,
  service: "Corte + Barba",
  time: "2025-07-28 17:00",
  barber: "Juan Pérez"
};

export default function ClientDashboardPage() {

  return (
    <div className="pt-10 pb-20 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Bienvenido a tu Panel</h1>
            <p className="text-gray-300 text-lg">Gestioná tus turnos y servicios de manera simple y rápida.</p>
          </div>
          <div className="flex items-center gap-4">
            <LinkButton
              href="/client/appointments"
              className="!text-black animate-fade-up animate-once animate-duration-700 animate-delay-200"
            >
              <PlusCircle className="w-5 h-5 text-green-500" />
              Reservar turno
            </LinkButton>
          </div>
        </div>

        {/* Layout principal con flex */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Próxima cita primero en mobile, a la derecha en desktop */}
          <section className="order-1 lg:order-2 w-full lg:w-1/3 bg-white/95 rounded-md shadow-lg p-6 flex flex-col gap-4 min-h-[350px] animate-fade-in animate-once animate-duration-700 animate-delay-300 h-full lg:top-28">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-black">Próxima cita</h2>
            </div>
            {currentAppointment.exists ? (
              <div className="flex flex-col gap-2">
                <div className="text-black font-bold text-lg flex items-center gap-2"><Scissors className="w-5 h-5 text-blue-500" /> {currentAppointment.service}</div>
                <div className="text-gray-700 flex items-center gap-2"><User className="w-4 h-4 text-amber-500" /> {currentAppointment.barber}</div>
                <div className="text-gray-700 flex items-center gap-2"><Clock className="w-4 h-4 text-fuchsia-500" /> {currentAppointment.time}</div>
                <Link
                  href="/client/appointments"
                  className="mt-2 px-4 py-2 rounded-md bg-primary text-black font-medium hover:bg-primary/80 transition-colors w-fit"
                >
                  Ver detalles
                </Link>
              </div>
            ) : (
              <div className="text-gray-700">No tienes ninguna cita reservada actualmente.</div>
            )}
          </section>

          {/* Servicios y barberos en una sola columna */}
          <div className="order-2 lg:order-1 w-full lg:w-2/3 flex flex-col gap-8 justify-between h-full">
            {/* Servicios */}
            <section className="bg-white/95 rounded-md shadow-lg p-6 flex flex-col animate-fade-up animate-once animate-duration-700 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black flex items-center gap-2"><Scissors className="w-6 h-6 text-primary" /> Servicios</h2>
                <Link href="/services" className="text-primary font-medium hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.slice(0, 3).map((service) => (
                  <div key={service.id} className="group bg-gradient-to-br from-primary/10 to-white rounded-md shadow p-5 flex flex-col items-center gap-2 border border-primary/10 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 animate-fade-up animate-once animate-duration-700">
                    <div className="mb-2">{service.icon}</div>
                    <h3 className="text-lg font-bold text-black text-center group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-gray-700 text-center text-sm">{service.description}</p>
                    <span className="text-primary font-semibold text-base mt-1">${service.price}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Barberos */}
            <section className="bg-white/95 rounded-md shadow-lg p-6 flex flex-col gap-4 animate-fade-up animate-once animate-duration-700 animate-delay-200 h-full lg:flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-black">Barberos</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {barbers.map((barber) => (
                  <div key={barber.id} className="group flex items-center gap-3 bg-primary/10 rounded-md px-3 py-2 hover:bg-primary/20 transition-colors animate-fade-up animate-once animate-duration-700 animate-delay-300">
                    {barber.icon}
                    <div className="flex flex-col">
                      <span className="text-black font-semibold group-hover:text-primary transition-colors">{barber.name}</span>
                      <span className="text-gray-700 text-xs">{barber.specialty}</span>
                    </div>
                    <Link href="/client/appointments" className="ml-auto text-primary font-medium text-xs hover:underline flex items-center gap-1">
                      Reservar <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
    </div>
  );
}
