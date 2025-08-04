"use client";
import { Button } from "@/core/components/Button";
import { GetService } from "@/modules/services/services.type";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";

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
    const { getValues } = useFormContext<CreateAppointmentFormData>();
    const selectedServices = getValues("services");

    return (
        <div className="w-full md:w-[500px] bg-gray-50 border border-gray-200 rounded-lg p-6 h-fit md:sticky md:top-8 self-start flex flex-col justify-between min-h-[320px]">
            <div>
                <h3 className="font-bold text-lg mb-2">Resumen</h3>
                <ul className="mb-2">
                    {selectedServices.length === 0 ? (
                        <li className="text-gray-400">
                            No hay servicios seleccionados
                        </li>
                    ) : (
                        selectedServices.map((s) => {
                            const service = services.find(
                                (serv) => serv.id === s.serviceId
                            );
                            const barber = barbers.find(
                                (b) => b.id === s.barberId
                            );
                            return service ? (
                                <li
                                    key={s.serviceId}
                                    className="flex flex-col text-sm mb-1"
                                >
                                    <div className="flex justify-between">
                                        <span>{service.name}</span>
                                        <span>
                                            ${service.price?.toFixed(2) ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Barbero:</span>
                                        <span>
                                            {
                                                (getValues("assignAutomatically") ? "Primero disponible" : barber?.name) ||
                                                <span className="text-gray-400">
                                                    No seleccionado
                                                </span>
                                            }
                                        </span>
                                    </div>
                                </li>
                            ) : null;
                        })
                    )}
                </ul>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">Fecha y hora</span>
                    <span>
                        {getValues("dateTime") ? (
                            getValues("dateTime")
                        ) : (
                            <span className="text-gray-400">
                                No seleccionada
                            </span>
                        )}
                    </span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>
                        $
                        {selectedServices
                            .reduce((acc, s) => {
                                const serv = services.find(
                                    (serv) => serv.id === s.serviceId
                                );
                                return acc + (serv?.price || 0);
                            }, 0)
                            .toFixed(2)}
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
                          (!getValues("assignAutomatically") &&
                            selectedServices.some(
                                (s) =>
                                    !s.barberId ||
                                    !/^[0-9a-fA-F-]{36}$/.test(s.barberId)
                            ))
                        : selectedServices.length === 0 ||
                          (!getValues("assignAutomatically") &&
                            selectedServices.some(
                                (s) =>
                                    !s.barberId ||
                                    !/^[0-9a-fA-F-]{36}$/.test(s.barberId)
                            )) ||
                          !getValues("dateTime")
                }
            >
                Continuar
            </Button>
        </div>
    );
};
