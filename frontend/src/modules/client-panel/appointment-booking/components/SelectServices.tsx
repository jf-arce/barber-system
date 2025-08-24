import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { GetService } from "@/modules/services/services.type";
import { SelectableServiceCard } from "@/modules/services/components/SelectableServiceCard";

interface SelectServicesProps {
    services: GetService[];
}

export const SelectServices = ({ services }: SelectServicesProps) => {

    const { getValues, setValue, watch } = useFormContext<CreateAppointmentFormData>();
    
    // Toggle service selection
    const handleServiceCardClick = (serviceId: number) => {
        const current = getValues("services");
        const exists = current.some(s => s.serviceId === serviceId);
        if (exists) {
          setValue(
            "services",
            current.filter(s => s.serviceId !== serviceId),
            { shouldValidate: true } // Se valida y actualiza el estado
          );
        } else {
          setValue(
            "services",
            [...current, { serviceId, barberId: "" }],
            { shouldValidate: true } // Se valida y actualiza el estado
          );
        }
      };

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Paso 1: Selecciona uno o más servicios</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {services.map((service, idx) => {
                    const selectedServices = watch("services");
                    const selected = selectedServices.some(s => s.serviceId === service.id);
                    return (
                        <SelectableServiceCard
                            key={service.id}
                            service={service}
                            selected={selected}
                            onClick={() => handleServiceCardClick(service.id)}
                            delayMs={idx * 120}
                        />
                    );
                })}
            </div>
        </>
    )
}
