import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/modules/auth/auth.store";
import { CreateAppointmentFormData, createAppointmentSchema } from "../schemas/createAppointment.schema";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { getBarbersForSelectedServices } from "../helpers/getBarbersForSelectedServices";
import { hasServiceSelectionChanged } from "../helpers/hasServiceSelectionChanged";
import { AppointmentsService } from "@/modules/appointments/appointments.service";

interface UseAppointmentFormProps {
    barbers: GetBarber[];
}

export const useAppointmentBookingForm = ({ barbers }: UseAppointmentFormProps) => {
    const [step, setStep] = useState<number>(1);
    const [lastServiceIds, setLastServiceIds] = useState<number[]>([]);
    const [barbersFiltered, setBarbersFiltered] = useState<GetBarber[]>(barbers);
    const [isSelectingBarberPerService, setIsSelectingBarberPerService] = useState(false);
    const router = useRouter();

    const userAuthenticated = useAuthStore().userAuthenticated;

    const formMethods = useForm<CreateAppointmentFormData>({
        resolver: zodResolver(createAppointmentSchema),
        defaultValues: {
            userId: userAuthenticated?.id,
            services: [],
            assignAutomatically: false,
        }
    });

    const {
        getValues,
        setValue,
        trigger,
        handleSubmit,
        register,
        watch
    } = formMethods;

    const nextStep = async () => {

        if (step === 1) {
            // Actualizar barberos filtrados y lastServiceIds
            const selectedServices = getValues("services");
            const idSelectedServices = selectedServices.map(s => s.serviceId);
            setBarbersFiltered(getBarbersForSelectedServices(barbers, idSelectedServices));
            setLastServiceIds(idSelectedServices);
        }

        // Validar el formulario según el paso actual
        let isValid = false;
        if (step === 1) {
            isValid = await trigger("services");
        } else if (step === 2) {
            isValid = await trigger("services");
        } else if (step === 3) {
            isValid = await trigger("dateTime");
        } else {
            isValid = true;
        } 

        if (step === 1 && isValid) {
            // Si vamos de step 1 a step 2, y la combinación de servicios cambió, reiniciar barberos
            const selectedServices = getValues("services");
            const idSelectedServices = selectedServices.map(s => s.serviceId).sort();

            if (hasServiceSelectionChanged(idSelectedServices, lastServiceIds)) {
                setValue(
                    "services",
                    selectedServices.map(s => ({ serviceId: s.serviceId, barberId: "" })),
                    { shouldValidate: true }
                );
                setValue("assignAutomatically", false, { shouldValidate: false });
            }
        }

        if (isValid) setStep((prev) => prev + 1);
    }


    const prevStep = () => setStep((prev) => prev - 1);

    const onSubmit = (newAppointment: CreateAppointmentFormData) => {
        if (step !== 4) return;

        const localDate = new Date(newAppointment.dateTime);
        const utcDate = new Date(
            localDate.getTime() - localDate.getTimezoneOffset() * 60000
        ).toISOString();

        const servicesToSend = newAppointment.services.map(service => ({
            serviceId: service.serviceId,
            barberId: getValues("assignAutomatically") ? null : service.barberId,
        }));

        const appointmentToSend = {
            dateTime: utcDate,
            userId: newAppointment.userId,
            services: servicesToSend,
            assignBarberAutomatically: getValues("assignAutomatically"),
        };

        console.log("Formulario enviado:", appointmentToSend);
        alert("Formulario enviado exitosamente!");

        AppointmentsService.create(appointmentToSend);

        router.push("/client/dashboard");
    }

    const handleSubmitForm = handleSubmit(onSubmit);

    return {
        step,
        nextStep,
        prevStep,
        lastServiceIds,
        setLastServiceIds,
        barbersFiltered,
        isSelectingBarberPerService,
        setIsSelectingBarberPerService,
        formMethods,
        handleSubmitForm,
        register,
        watch
    }
}
