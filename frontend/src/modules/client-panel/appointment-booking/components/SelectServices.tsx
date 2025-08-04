import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { GetService } from "@/modules/services/services.type";
import { CheckIcon, PlusIcon } from "@/core/components/Icons";

interface SelectServicesProps {
    services: GetService[];
}

export const SelectServices = ({ services }: SelectServicesProps) => {

    const { getValues, setValue } = useFormContext<CreateAppointmentFormData>();
    
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, idx) => {
                    const selectedServices = getValues("services");
                    const selected = selectedServices.some(s => s.serviceId === service.id);
                    return (
                        <div
                            key={service.id}
                            className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${idx * 120}ms] 
                                ${selected ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                            onClick={() => handleServiceCardClick(service.id)}
                        >
                            <div className="p-4">
                                <div className="flex gap-16 items-center justify-between">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            <h4 className={`font-semibold text-black group-hover:text-black transition-colors ${selected ? '' : ''}`}>{service.name}</h4>
                                            <p className="text-sm text-gray-500">{service.description || '1hs'}</p>
                                        </div>
                                        <span className="text-md font-medium text-black">desde ${service.price?.toFixed(2) ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {/* Icono de selección */}
                                        {selected ? (
                                            <CheckIcon className="w-7 h-7 text-green-600" />
                                        ) : (
                                            <PlusIcon className="w-7 h-7 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
