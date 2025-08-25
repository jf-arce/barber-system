import { useState } from "react";
import { AppointmentsService } from "@/modules/appointments/appointments.service";
import { toast } from "sonner";

export function useAppointmentActions(onRefresh?: () => void) {
  const [loading, setLoading] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [newDateTime, setNewDateTime] = useState("");

  const handleCancelAppointment = async (appointmentId: number) => {
    setLoading(true);
    try {
      await AppointmentsService.cancelAppointment(appointmentId);
      setTimeout(() => {
        toast.success("Cita cancelada con éxito", {
          description: "Tu cita ha sido cancelada.",
        });
        if (onRefresh) onRefresh();
      }, 150);
    } catch {
      toast.error("Error al cancelar la cita", {
        description: "Ocurrió un error al cancelar tu cita.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleAppointment = async (e: React.FormEvent, appointmentId: number) => {
    e.preventDefault();
    setLoading(true);
    try {
      const localDate = new Date(newDateTime);
      const utcDateTime = localDate.toISOString();
      await AppointmentsService.rescheduleAppointment({ id: appointmentId, newDateTime: utcDateTime });
      setTimeout(() => {
        toast.success("Cita reprogramada con éxito", {
          description: "Tu cita ha sido reprogramada.",
        });
        if (onRefresh) onRefresh();
      }, 150);
      setRescheduleOpen(false);
      setNewDateTime("");
    } catch {
      toast.error("Error al reprogramar la cita", {
        description: "Ocurrió un error al reprogramar tu cita.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    rescheduleOpen,
    setRescheduleOpen,
    newDateTime,
    setNewDateTime,
    handleCancelAppointment,
    handleRescheduleAppointment,
  };
}
