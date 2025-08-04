import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { GetBarber } from "../../../barbers/barbers.type";
import { SelectableBarberCard } from "@/modules/barbers/components/SelectableBarberCard";

interface SelectBarberProps {
    barbersFiltered: GetBarber[];
}

export const SelectBarber = ({ barbersFiltered }: SelectBarberProps) => {
    const { getValues, setValue, watch } = useFormContext<CreateAppointmentFormData>();

    //Seleccionar un barbero para todos los servicios
    const handleBarberSelect = (barber: GetBarber) => {
        if (getValues("assignAutomatically")) {
            setValue("assignAutomatically", false, { shouldValidate: false });
        }
        const current = getValues("services");
        setValue(
            "services",
            current.map(item => ({ ...item, barberId: barber.id })),
            { shouldValidate: true }
        );
    }

    return (
        <>
            {barbersFiltered.map((barber, index) => {
                //AllSelected: si todos los servicios tienen el mismo barbero seleccionado
                const selectedServices = watch("services");
                const allSelected =
                    selectedServices.length > 0 &&
                    selectedServices.every(s => s.barberId === barber.id) &&
                    !watch("assignAutomatically");

                return (
                    <SelectableBarberCard
                        key={barber.id}
                        barber={barber}
                        selected={allSelected}
                        onClick={() => handleBarberSelect(barber)}
                        delayMs={index * 120}
                    />
                );
            })}
        </>
    );
}
