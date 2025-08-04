import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { GetService } from "@/modules/services/services.type";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { SelectableBarberCard } from "@/modules/barbers/components/SelectableBarberCard";

interface BarberPerServiceSelectorProps {
    services: GetService[];
    barbers: GetBarber[];
}

export const BarberPerServiceSelector = ({ services, barbers }: BarberPerServiceSelectorProps) => {

    const { getValues, setValue, watch } = useFormContext<CreateAppointmentFormData>();

    // Asigna un barbero a un servicio específico
    const handleBarberSelect = (serviceId: number, barberId: string) => {
        const currentServices = getValues("services");
        const updated = currentServices.map(currentService =>
            currentService.serviceId === serviceId ? { ...currentService, barberId } : currentService
        );
        setValue("services", updated, { shouldValidate: true });
        
        // Si se selecciona un barbero, desactivar la opción "Primero disponible"
        if (getValues("assignAutomatically")) {
            setValue("assignAutomatically", false, { shouldValidate: false });
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Elegí un barbero por servicio</h2>
            <div className="flex flex-col gap-6 mt-4">
                {(watch("services")).map((service) => {
                    const barberService = services.find(serv => serv.id === service.serviceId);
                    // Filtrar barberos que pueden hacer este servicio
                    const barbersForService = barbers.filter(barber =>
                        barber.services.some(s => s.id === service.serviceId)
                    );
                    return (
                        <div key={service.serviceId} className="mb-6">
                            <p className="mb-2 font-semibold text-lg">{barberService?.name || 'Servicio'}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {barbersForService.map((barber, index) => {
                                    const selected = service.barberId === barber.id;
                                    return (
                                        <SelectableBarberCard
                                            key={barber.id}
                                            barber={barber}
                                            selected={selected}
                                            onClick={() => handleBarberSelect(service.serviceId, barber.id)}
                                            delayMs={index * 120}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
