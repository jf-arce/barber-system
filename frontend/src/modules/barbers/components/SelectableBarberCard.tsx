import { CheckIcon, PlusIcon } from "@/core/components/Icons";
import { GetBarber } from "@/modules/barbers/barbers.type";

interface BarberCardProps {
    barber: GetBarber;
    selected: boolean;
    delayMs?: number;
    onClick: () => void;
}

export const SelectableBarberCard = ({ barber, selected, delayMs, onClick }: BarberCardProps) => (
    <div
        className={[
            "rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4",
            `animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${delayMs || 60}ms]`,
            selected
                ? "border-primary bg-primary/60"
                : "border-primary/30 hover:bg-primary/60"
        ].join(" ")}
        onClick={onClick}
    >
        <div className="flex gap-16 items-center justify-between w-full">
            <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">
                    {barber.name}
                </h4>
                <p className="text-sm text-gray-500">Barbero</p>
            </div>
            <div className="flex items-center space-x-4">
                {selected ? (
                    <CheckIcon className="w-7 h-7 text-green-600" />
                ) : (
                    <PlusIcon className="w-7 h-7 text-gray-400" />
                )}
            </div>
        </div>
    </div>
);