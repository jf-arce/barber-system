/**
 * BookingBackButton component renders a back button for the appointment booking flow.
 * 
 * The button's behavior adapts based on the current booking step and sub-step:
 * - If on step 2 and selecting a barber per service, it returns to the global barber selection.
 * - If on any step greater than 1, it resets the sub-step (if applicable) and moves to the previous step.
 * - If on the first step, it navigates the user back to the client dashboard.
 */
import { ArrowLeftIcon } from "@/core/components/Icons";
import { useRouter } from "next/navigation";

interface BookingBackButtonProps {
    step: number;
    setIsSelectingBarberPerService: (value: boolean) => void;
    isSelectingBarberPerService: boolean;
    prevStep: () => void;
}

export const BookingBackButton = ({
    step,
    setIsSelectingBarberPerService,
    isSelectingBarberPerService,
    prevStep
}: BookingBackButtonProps) => {

    const router = useRouter();

    const handleBackClick = () => {
        if (step === 2 && isSelectingBarberPerService) {
            setIsSelectingBarberPerService(false);
        } else if (step > 1) {
            setIsSelectingBarberPerService(false);
            prevStep();
        } else {
            router.push("/client/dashboard");
        }
    }

    return (
        <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center gap-2 mb-4 text-gray-700 hover:text-black transition cursor-pointer bg-transparent hover:bg-gray-300/30 rounded-md px-2 py-2 group"
        >
            <ArrowLeftIcon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="font-medium">Volver</span>
        </button>
    );
};
