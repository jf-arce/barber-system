import { Button } from "@/core/components/Button";
import { GetService } from "@/modules/services/services.type";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { getDateTimeFormatted } from "@/core/utils/getDateTimeFormatted";
import { useFormContext } from "react-hook-form";
import { CreateAppointmentFormData } from "../schemas/createAppointment.schema";
import { Calendar, User, Scissors, Clock } from "lucide-react";

interface BookingConfirmationPanelProps {
  services: GetService[];
  barbers: GetBarber[];
}

export const BookingConfirmationPanel = ({ services, barbers }: BookingConfirmationPanelProps) => {
  const { watch } = useFormContext<CreateAppointmentFormData>();
  const selectedServices = watch("services");
  const assignAutomatically = watch("assignAutomatically");
  const startDateTime = watch("startDateTime");
  const formattedDate = getDateTimeFormatted(startDateTime);

  // Calcular fecha de inicio y fin para cada servicio
  let currentStart = startDateTime ? new Date(startDateTime) : null;
  const serviceDetails = selectedServices.map((s) => {
    const service = services.find(serv => serv.id === s.serviceId);
    const barber = barbers.find(b => b.id === s.barberId);
    const duration = service?.duration || 0;
    const start = currentStart ? new Date(currentStart) : null;
    const end = start ? new Date(start.getTime() + duration * 60 * 60 * 1000) : null;
    if (currentStart) currentStart = end;
    return {
      service,
      barber,
      start,
      end,
      assignAutomatically,
    };
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Paso 4: Confirmar cita</h2>
      <div className="mb-6 p-6 rounded-md bg-white border border-primary/30">
        <h3 className="font-semibold mb-4 text-lg text-gray-800 flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" /> Resumen de la cita
        </h3>
        {/* Fecha y hora de inicio */}
        <div className="flex items-center gap-4 p-4 rounded-sm bg-gray-50 border border-gray-200 mb-4">
          <Calendar className="h-6 w-6 text-primary" />
          <div className="flex-1">
            <div className="font-semibold text-black text-base">{formattedDate.date || '-'}</div>
            <div className="flex items-center gap-2 text-gray-700 mt-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{formattedDate.hour || '-'}</span>
            </div>
          </div>
        </div>
        {/* Detalle de servicios */}
        <div className="space-y-4">
          {serviceDetails.map((detail, idx) => (
            <div key={detail.service?.id || idx} className="flex items-center gap-4 p-4 rounded-sm bg-gray-50 border border-gray-200">
              <Scissors className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <div className="font-semibold text-black text-base">{detail.service?.name || '-'}</div>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium">{detail.barber?.name || '-'}</span>
                  {detail.assignAutomatically && <span className="text-xs text-gray-500">(Primero disponible)</span>}
                </div>
                <div className="flex items-center gap-2 text-gray-700 mt-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Inicio: {detail.start ? getDateTimeFormatted(detail.start.toISOString()).hour : '-'}</span>
                  <span className="mx-2">|</span>
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Fin: {detail.end ? getDateTimeFormatted(detail.end.toISOString()).hour : '-'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Confirmar cita
      </Button>
    </div>
  );
};
