import { Badge } from "@/core/components/Badge";
import { Button } from "@/core/components/Button";
import { getDateTimeFormatted } from "@/core/utils/getDateTimeFormatted";
import { AppointmentStatus, GetAppointment } from "@/modules/appointments/appointments.type";
import { History, Star } from "lucide-react";

// const historyData = [
//   {
//     service: "Corte y Barba",
//     date: "20 Dic 2023",
//     time: "14:00",
//     price: 3500,
//     rating: 5,
//   },
//   {
//     service: "Coloración",
//     date: "15 Nov 2023",
//     time: "16:30",
//     price: 6000,
//     rating: 5,
//   },
//   {
//     service: "Afeitado Premium",
//     date: "10 Oct 2023",
//     time: "13:00",
//     price: 4000,
//     rating: 4,
//   },
// ];

interface AppointmentsHistoryProps {
  appointments: GetAppointment[];
}

export const AppointmentsHistory = ({ appointments }: AppointmentsHistoryProps) => {
    return (
        <div className="bg-gray-100 shadow-xl mt-6 rounded-sm animate-fade-up animate-duration-700 animate-ease-out animate-delay-300">
            <div className="p-4">
                <h4 className="text-sm font-medium text-black mb-3 flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    Historial Reciente
                </h4>
                <div className="space-y-3">
                    {appointments.slice(0, 2).map((item, idx) => {
                        const totalPrice = item?.appointmentDetails?.reduce((sum, ad) => sum + ad.service.price, 0);
                        return (
                            <div
                                key={idx}
                                className="flex items-center justify-between text-sm"
                            >
                                <div>
                                    <p className="text-black font-semibold">
                                        {item.appointmentDetails.map(ad => ad.service.name).join(" + ")}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                        <span>{getDateTimeFormatted(item.appointmentDetails[0].startDateTime).date || "-"}</span>
                                        <span>·</span>
                                        <span>{getDateTimeFormatted(item.appointmentDetails[0].startDateTime).hour || "-"}</span>
                                        <span>·</span>
                                        <span className="text-black/80 font-bold">
                                            ${totalPrice}
                                        </span>
                                    </div>
                                    <Badge
                                        className="mt-1"
                                        variant={
                                            item.status === AppointmentStatus.CANCELLED
                                                ? "destructive"
                                                : item.status === AppointmentStatus.COMPLETED
                                                ? "success"
                                                : item.status === AppointmentStatus.CONFIRMED
                                                ? "warning"
                                                : "default"
                                        }
                                    >
                                        {item.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-3 w-3 fill-yellow-500 text-yellow-500"
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Button className="mt-5 !text-black/80">
                    Ver todo el historial
                </Button>
            </div>
        </div>
    );
};
