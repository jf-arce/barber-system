import { Button } from "@/core/components/Button";
import { AlertCircle, Calendar, CheckCircle, Clock, Plus, RotateCcw, User, X } from "lucide-react";

const currentAppointment = {
  status: true,
  service: "Corte + Barba",
  date: "2025-07-28 17:00",
  barber: "Juan Pérez",
  price: 16000
};


export const NextAppointment = () => {
    return (
        <>
            {currentAppointment.status ? (
                <div className="rounded-md bg-gray-100 shadow-xl animate-fade-up animate-duration-700 animate-ease-out animate-delay-100">
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
                                    <h4 className="text-xl font-semibold text-black mb-2">
                                        {currentAppointment.service}
                                    </h4>
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
                                            <p className="text-xs text-gray-700 font-semibold">
                                                Fecha
                                            </p>
                                            <p className="font-bold text-black text-base">
                                                15 Enero
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary mb-2">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </span>
                                            <p className="text-xs text-gray-700 font-semibold">
                                                Hora
                                            </p>
                                            <p className="font-bold text-black text-base">
                                                14:30
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Precio
                                        </p>
                                        <p className="text-2xl font-bold text-black">
                                            ${currentAppointment.price}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-700">
                                            Duración
                                        </p>
                                        <p className="font-semibold text-black">
                                            1hs
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-primary/20 rounded-lg p-4 border border-primary">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="h-4 w-4 text-amber-950 mt-0.5 flex-shrink-0" />
                                        <div className="text-xs text-gray-800">
                                            <p className="text-amber-950 font-medium mb-1">
                                                Recordatorio:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Llega 10 min antes.</li>
                                                <li>
                                                    Cancelaciones tardías se
                                                    cobran completas.
                                                </li>
                                                <li>
                                                    Las reprogramaciones solo
                                                    pueden realizarse hasta 24hs
                                                    antes de la cita.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <Button className="bg-neutral-600 text-background hover:bg-neutral-500">
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reprogramar
                                    </Button>
                                    <Button className="bg-red-700 hover:bg-red-600 text-background">
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
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No tienes citas programadas
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¡Reserva tu próxima cita y luce increíble!
                        </p>
                        <Button className="!text-black/80">
                            <Plus className="mr-2 h-4 w-4" />
                            Reservar Ahora
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
