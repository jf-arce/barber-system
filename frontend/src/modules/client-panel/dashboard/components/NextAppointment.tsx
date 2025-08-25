import { Button } from "@/core/components/Button";
import { AppointmentStatus, GetAppointment } from "@/modules/appointments/appointments.type";
import { AlertCircle, Calendar, CheckCircle, Clock, RotateCcw, User, X } from "lucide-react";
import { getDateTimeFormatted } from "../../../../core/utils/getDateTimeFormatted";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/core/components/AlertDialog";
import { AppointmentsService } from "@/modules/appointments/appointments.service";
import { toast } from 'sonner'

interface NextAppointmentProps {
  appointment: GetAppointment;
}

export const NextAppointment = ({ appointment }: NextAppointmentProps) => {
    
    const startDateTimeUTC = appointment?.appointmentDetails?.[0]?.startDateTime;
    const totalDuration = appointment?.appointmentDetails?.reduce((sum, ad) => sum + ad.service.duration, 0);
    const totalPrice = appointment?.appointmentDetails?.reduce((sum, ad) => sum + ad.service.price, 0);
    const dateTimeFormated = getDateTimeFormatted(startDateTimeUTC);

    const handleCancelAppointment = () => {
        AppointmentsService.cancelAppointment(appointment.id)
            .then(() => {
                setTimeout(() => {
                    toast.success('Cita cancelada con éxito', {
                        description: 'Tu cita ha sido cancelada.',
                    });
                }, 150);
            })
            .catch(() => {
                toast.error('Error al cancelar la cita', {
                    description: 'Ocurrió un error al cancelar tu cita.',
                });
            });
    };

    return (
        <>
            {appointment && appointment.status !== AppointmentStatus.COMPLETED && appointment.status !== AppointmentStatus.CANCELLED ? (
                <div className="rounded-md bg-gray-100 shadow-xl animate-fade-up animate-duration-700 animate-ease-out animate-delay-100">
                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-black flex items-center">
                                    <Calendar className="mr-2 h-5 w-5 text-black" />
                                    Tu Próxima Cita
                                </h3>
                                <CheckCircle className="w-7 h-7 text-green-600 flex" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xl font-semibold text-black mb-2">
                                        {appointment.appointmentDetails.map(ad => ad.service.name).join(" + ")}
                                    </h4>
                                    <p className="text-gray-700 flex items-center gap-1">
                                        <User className="h-4 w-4 text-black" />
                                        con
                                        <span className="font-semibold">
                                            {Array.from(
                                                new Set(appointment.appointmentDetails.map(ad => ad.barber.name))
                                            ).join(" y ")}
                                        </span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-500/40">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary mb-2">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </span>
                                            <p className="text-xs text-gray-700 font-semibold">
                                                Fecha
                                            </p>
                                            <p className="font-bold text-black text-base text-center">
                                                {dateTimeFormated.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary mb-2">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </span>
                                            <p className="text-xs text-gray-700 font-semibold">
                                                Hora
                                            </p>
                                            <p className="font-bold text-black text-base">
                                                {dateTimeFormated.hour}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Precio
                                        </p>
                                        <p className="text-2xl font-bold text-black">
                                            ${totalPrice}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-700">
                                            Duración
                                        </p>
                                        <p className="font-semibold text-black">
                                            {totalDuration === 1 ? "1 hora" : `${totalDuration} horas`}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-primary/20 rounded-lg p-4 border border-primary">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="h-4 w-4 text-amber-950 mt-0.5 flex-shrink-0" />
                                        <div className="text-xs text-gray-800">
                                            <p className="text-amber-950 font-medium mb-1">
                                                Recordatorio:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Llega 10 min antes.</li>
                                                <li>
                                                    Cancelaciones tardías se
                                                    cobran completas.
                                                </li>
                                                <li>
                                                    Las reprogramaciones solo
                                                    pueden realizarse hasta 24hs
                                                    antes de la cita.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <Button className="bg-neutral-600 text-background hover:bg-neutral-500">
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reprogramar
                                    </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="bg-red-700 hover:bg-red-600 text-background">
                                                    <X className="mr-2 h-4 w-4" />
                                                    Cancelar
                                                </Button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        ¿Estás seguro de que deseas cancelar la cita?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer.
                                                        Una vez cancelada, deberás reservar una nueva cita si lo deseas.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleCancelAppointment}>Continuar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-100 border-gray-300">
                    <div className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No tienes citas programadas
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¡Reserva tu próxima cita y luce increíble!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
