import { Button } from "@/core/components/Button";
import { Calendar, Clock } from "lucide-react";
import { GetService } from "@/modules/services/services.type";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import dayjs from "dayjs";
import 'dayjs/locale/es';

dayjs.locale('es');

interface SummaryPanelProps {
    services: GetService[];
    barbers: GetBarber[];
    step: number;
    nextStep: () => void;
}

export const SummaryPanel = ({
    services,
    barbers,
    step,
    nextStep,
}: SummaryPanelProps) => {
    const { watch } = useFormContext<CreateAppointmentFormData>();
    const selectedServices = watch("services");

    // Calcular duración en horas y minutos
    const startDateTime = watch("startDateTime");
    const endDateTime = watch("endDateTime");
    let durationStr = "";
    if (startDateTime && endDateTime) {
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        durationStr = `(${hours > 0 ? `${hours} h` : ""}${hours > 0 && mins > 0 ? " " : ""}${mins > 0 ? `${mins} min` : ""} de duración)`;
    }

    return (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-6 md:sticky md:top-8 self-start flex flex-col">
            <div>
                <h3 className="font-bold text-lg mb-2">Resumen</h3>
                <ul className="mb-2">
                    {selectedServices.length === 0 ? (
                        <li className="text-gray-400">No hay servicios seleccionados</li>
                    ) : (
                        selectedServices.map((s) => {
                            const service = services.find((serv) => serv.id === s.serviceId);
                            const barber = barbers.find((b) => b.id === s.barberId);
                            return service ? (
                                <li key={s.serviceId} className="flex flex-col mb-5">
                                    <div className="flex justify-between font-medium text-sm">
                                        <span>{service.name}</span>
                                        <span>desde ${service.price?.toFixed(2) ?? "-"}</span>
                                    </div>
                                    <div className="flex text-sm text-gray-500">
                                        <p>
                                            {(watch("assignAutomatically") ? 
                                                (
                                                    <span>
                                                        Con <span className="text-gray-600 font-bold">el primero disponible</span>
                                                    </span>
                                                )
                                                : barber?.name && (
                                                    <span>
                                                        Con <span className="text-gray-600 font-bold">{barber.name}</span>
                                                    </span>
                                                )) || (
                                                    <span className="text-gray-600">No seleccionado</span>
                                                )}
                                        </p>
                                    </div>
                                </li>
                            ) : null;
                        })
                    )}
                </ul>
                {/* Fecha con ícono de calendario */}
                <div className="flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {startDateTime ? (
                        <span>{dayjs(startDateTime).format('dddd D [de] MMMM [de] YYYY')}</span>
                    ) : (
                        <span className="text-gray-400">Fecha no seleccionada</span>
                    )}
                </div>
                {/* Rango horario con ícono de reloj */}
                <div className="flex items-center gap-2 text-sm mb-4">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {startDateTime && endDateTime ? (
                        <span>
                            {`${new Date(startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} - ${new Date(endDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} `}
                            <span className="text-sm text-gray-500">{durationStr}</span>
                        </span>
                    ) : (
                        <span className="text-gray-400">Horario no seleccionado</span>
                    )}
                </div>
                <div className="flex justify-between font-bold border-t pt-4 text-lg">
                    <span>Total</span>
                    <span>
                        desde ${selectedServices
                            .reduce((acc, s) => {
                                const serv = services.find((serv) => serv.id === s.serviceId);
                                return acc + (serv?.price || 0);
                            }, 0)
                            .toFixed(0)}
                    </span>
                </div>
            </div>
            <Button
                className="mt-8 transition"
                onClick={nextStep}
                disabled={
                    step === 1
                        ? selectedServices.length === 0
                        : step === 2
                        ? selectedServices.length === 0 ||
                          (!watch("assignAutomatically") &&
                            selectedServices.some(
                                (s) =>
                                    !s.barberId ||
                                    !/^[0-9a-fA-F-]{36}$/.test(s.barberId)
                            ))
                        : selectedServices.length === 0 ||
                          (!watch("assignAutomatically") &&
                            selectedServices.some(
                                (s) =>
                                    !s.barberId ||
                                    !/^[0-9a-fA-F-]{36}$/.test(s.barberId)
                            )) ||
                          !watch("startDateTime") ||
                          !watch("endDateTime")
                }
            >
                Continuar
            </Button>
        </div>
    );
};
