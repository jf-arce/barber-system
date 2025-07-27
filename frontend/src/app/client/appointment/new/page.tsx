"use client";
import { useEffect, useState } from "react"
import { BarberServicesService } from "@/modules/barber-services/barber-services.service"
import { Services } from "@/modules/barber-services/services.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthStore } from "@/modules/auth/auth.store";
import { BarbersService } from "@/modules/barbers/barbers.service";
import { Barber } from "@/modules/barbers/barbers.type";
import { AppointmentsService } from "@/modules/appointments/appointments.service";

const newAppointmentSchema = z.object({
  datetime: z.string().min(3, "La fecha y hora son requeridas").max(100),
  serviceId: z.number().min(1, "Se debe seleccionar un servicio"),
  barberId: z.string().uuid("Se debe seleccionar un profesional"),
  userId: z.string().uuid("Se debe seleccionar un usuario"),
})

type NewAppointmentFormData = z.infer<typeof newAppointmentSchema>

export default function NewAppointmentPage(){
  
  const [step, setStep] = useState(1)
  const userAuthenticated = useAuthStore().userAuthenticated;
  const [services, setServices] = useState<Services[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const{
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    getValues,
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      userId: userAuthenticated?.id,
    }
  })

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger("serviceId");
    } else if (step === 2) {
      console.log("Barber ID:", getValues("barberId"));
      isValid = await trigger("barberId");
    } else if (step === 3) {
      isValid = await trigger("datetime");
    } else {
      isValid = true;
    }
    if (isValid) setStep((prev) => prev + 1);
  }

  const prevStep = () =>  setStep((prev) => prev - 1);

  const onSubmit = (newAppointment: NewAppointmentFormData) => {

    const localDate = new Date(newAppointment.datetime);

    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    const appointmentToSend = {
      ...newAppointment,
      datetime: utcDate,
    };

    console.log("Formulario enviado:", appointmentToSend);
    alert("Formulario enviado exitosamente!");

    AppointmentsService.create(appointmentToSend);
  }

  useEffect(() => { 
    const fetchServices = async () => {
      try {
        const services = await BarberServicesService.getAll();
        const barbers = await BarbersService.getAll();

        setServices(services);
        setBarbers(barbers);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);


  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Reservar una cita</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Paso 1: Selecciona un servicio</h2>
            <select {...register("serviceId", { valueAsNumber: true })} className="w-full p-2 border rounded">
              <option value={0}>Selecciona un servicio</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
            {
              errors.serviceId && (
                <span className="text-red-500">{errors.serviceId.message}</span>
              )
            }
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Paso 2: Selecciona un barbero</h2>
            <select {...register("barberId")} className="w-full p-2 border rounded">
              <option value="">Selecciona un Profesional</option>
              {barbers.map(barber => (
                <option key={barber.id} value={barber.id}>{barber.name}</option>
              ))}
            </select>
            {
              errors.barberId && (
                <span className="text-red-500">{errors.barberId.message}</span>
              )
            }
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Paso 3: Selecciona una fecha y hora</h2>
            <input
              type="datetime-local" 
              {...register("datetime")} 
              className="w-full p-2 border rounded"
            />
            {
              errors.datetime && touchedFields.datetime && (
                <span className="text-red-500">{errors.datetime.message}</span>
              )
            }
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Paso 4: Confirmar cita</h2>
            <div className="mb-4 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Resumen de la cita:</h3>
              <ul>
                <li><b>Servicio:</b> {services.find(s => s.id === getValues("serviceId"))?.name || "-"}</li>
                <li><b>Profesional:</b> {barbers.find(b => b.id === getValues("barberId"))?.name || "-"}</li>
                <li><b>Fecha y hora:</b> {getValues("datetime") || "-"}</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
              Anterior
            </button>
          )}
          {step < 4 && (
            <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
              Siguiente
            </button>
          )}
          {step === 4 && (
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Confirmar Cita
            </button>
          )}
        </div>
      </form>

    </div>
  )
}
