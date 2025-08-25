import { Button } from "@/core/components/Button"
import { GetService } from "../services.type"
import { useBookingNavigation } from "../hooks/useBookingNavigation"

interface ServiceBookingCardProps {
    service: GetService
    className?: string;
}

export default function ServiceBookingCard({ service, className, ...props }: ServiceBookingCardProps) {
    const { goToBooking } = useBookingNavigation();
    const handleClick = () => goToBooking(service.id);
    return (
        <div
            {...props}
            className={`rounded-sm bg-gray-100/40 border border-primary hover:bg-primary/50 transition-all cursor-pointer group ${className ?? ""}`}
            onClick={handleClick}
        >
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h4 className="font-semibold text-black group-hover:text-black transition-colors">
                                {service.name}
                            </h4>
                            <p className="text-sm text-gray-500">{`${service.duration === 1 ? '1 hora' : `${service.duration} horas`}`}</p>
                        </div>
                        <span className="text-md font-medium text-black">desde ${service.price}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            className="border-black/20 bg-white/40 hover:bg-primary/20"
                            onClick={e => { e.stopPropagation(); handleClick(); }}
                        >
                            Reservar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
