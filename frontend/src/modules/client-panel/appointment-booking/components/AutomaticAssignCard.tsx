import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { CheckIcon, PlusIcon } from "@/core/components/Icons";

export const AutomaticAssignCard = () => {
    const { getValues, setValue, watch } = useFormContext<CreateAppointmentFormData>();

    const handelAutomaticAssignToggle = () => {
        setValue("assignAutomatically", !getValues("assignAutomatically"), { shouldValidate: true });
        setValue(
            "services",
            getValues("services").map(s => ({ ...s, barberId: "" })),
            { shouldValidate: true }
        );
    }

    return (
        <div
            className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[0ms] 
            ${watch("assignAutomatically") ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
            onClick={handelAutomaticAssignToggle}
        >
            <div className="flex gap-16 items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">Primero disponible</h4>
                    <p className="text-sm text-gray-500">El sistema elegirá el barbero más temprano disponible</p>
                </div>
                <div className="flex items-center space-x-4">
                    {watch("assignAutomatically") ? (
                        <CheckIcon className="w-7 h-7 text-green-600" />
                    ) : (
                        <PlusIcon className="w-7 h-7 text-gray-400" />
                    )}
                </div>
            </div>
        </div>
    )
}
