import { GetService } from "@/modules/services/services.type";
import { CheckIcon, PlusIcon } from "@/core/components/Icons";

interface SelectableServiceCardProps {
    service: GetService;
    selected: boolean;
    delayMs?: number;
    onClick: () => void;
}

export const SelectableServiceCard = ({
    service,
    selected,
    delayMs,
    onClick,
}: SelectableServiceCardProps) => (
    <div
        className={[
            "rounded-sm bg-gray-100/40 border transition-all cursor-pointer group",
            `animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${delayMs || 120}ms]`,
            selected
                ? "border-primary bg-primary/60"
                : "border-primary/30 hover:bg-primary/60"
        ].join(" ")}
        onClick={onClick}
    >
        <div className="p-4">
            <div className="flex gap-16 items-center justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-semibold text-black group-hover:text-black transition-colors">{service.name}</h4>
                        <p className="text-sm text-gray-500">{service.description || '1hs'}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">{`${service.duration === 1 ? '1 hora' : `${service.duration} horas`}`}</span>
                    <span className="text-md font-medium text-black">desde ${service.price?.toFixed(0) ?? '-'}</span>
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
    </div>
);