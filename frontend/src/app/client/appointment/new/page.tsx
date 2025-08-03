"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Plus, Check, ArrowLeft } from "lucide-react";
import { BarberServicesService } from "@/modules/barber-services/barber-services.service"
import { Service } from "@/modules/barber-services/services.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthStore } from "@/modules/auth/auth.store";
import { BarbersService } from "@/modules/barbers/barbers.service";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { AppointmentsService } from "@/modules/appointments/appointments.service";
import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";

const newAppointmentSchema = z.object({
  dateTime: z.string().min(3, "La fecha y hora son requeridas").max(100),
  userId: z.string().uuid("Se debe seleccionar un usuario"),
  services: z.array(z.object({
    serviceId: z.number().int("El ID del servicio debe ser un número entero"),
    barberId: z.string().uuid("Se debe seleccionar un barbero para el servicio"),
  })).min(1, "Se debe seleccionar al menos un servicio"),
});

type NewAppointmentFormData = z.infer<typeof newAppointmentSchema>;

export default function NewAppointmentPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  // Track last selected service IDs to detect changes
  const [lastServiceIds, setLastServiceIds] = useState<number[]>([]);
  // Estado para saber si se seleccionó "Primero disponible"
  const [assignAutomatically, setAssignAutomatically] = useState(false);
  const userAuthenticated = useAuthStore().userAuthenticated;
  const [barberServices, setBarberServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<GetBarber[]>([])
  const [barbersFiltered, setBarbersFiltered] = useState<GetBarber[]>(barbers);
  // Estado para mostrar la selección por servicio (sub-step)
  const [barberStepMode, setBarberStepMode] = useState<0 | 1>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    getValues,
    setValue,
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      userId: userAuthenticated?.id,
      services: [],
    }
  })

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      // Solo validar que haya servicios seleccionados
      const selectedServices = getValues("services") as { serviceId: number; barberId?: string }[];
      isValid = selectedServices.length > 0; 
      const idSelectedServices = selectedServices.map(s => s.serviceId);
      console.log("ID Selected Services:", idSelectedServices);

      // Barberos que ofrecen TODOS los servicios seleccionados
      const barbersFiltered = barbers.filter(barber =>
        idSelectedServices.every(selectedId =>
          barber.services.some(service => service.id === selectedId)
        )
      );
      console.log("Barbers Filtered:", barbersFiltered);
      setBarbersFiltered(barbersFiltered);

      // Guardar la combinación actual de servicios para comparar en el siguiente paso
      setLastServiceIds(idSelectedServices);

    } else if (step === 2) {
      // Validar que todos los servicios tengan barberId válido (uuid)
      const selectedServices = getValues("services") as { serviceId: number; barberId?: string }[];
      isValid = selectedServices.length > 0 && selectedServices.every(s => s.barberId && /^[0-9a-fA-F-]{36}$/.test(s.barberId));
    } else if (step === 3) {
      isValid = await trigger("dateTime");
    } else {
      isValid = true;
    }
    // Si vamos de step 1 a step 2, y la combinación de servicios cambió, reiniciar barberos
    if (step === 1 && isValid) {
      const selectedServices = getValues("services") as { serviceId: number; barberId?: string }[];
      const idSelectedServices = selectedServices.map(s => s.serviceId).sort();
      const lastIdsSorted = [...lastServiceIds].sort();
      const changed = idSelectedServices.length !== lastIdsSorted.length || idSelectedServices.some((id, i) => id !== lastIdsSorted[i]);
      if (changed) {
        // Reset barberId for all selected services
        setValue(
          "services",
          selectedServices.map(s => ({ serviceId: s.serviceId, barberId: "" })),
          { shouldValidate: true }
        );
      }
    }
    if (isValid) setStep((prev) => prev + 1);
  }

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (newAppointment: NewAppointmentFormData) => {
    const localDate = new Date(newAppointment.dateTime);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    // Solo enviar los IDs requeridos para cada servicio
    const servicesToSend = newAppointment.services.map(service => ({
      serviceId: service.serviceId,
      barberId: service.barberId,
    }));

    const appointmentToSend = {
      dateTime: utcDate,
      userId: newAppointment.userId,
      services: servicesToSend,
      assignAutomatically: assignAutomatically,
    };

    console.log("Formulario enviado:", appointmentToSend);
    alert("Formulario enviado exitosamente!");

    // AppointmentsService.create(appointmentToSend);
  }

  // Cargar servicios y barberos
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await BarberServicesService.getAll();
        const barbers = await BarbersService.getAll();

        setBarberServices(services);
        setBarbers(barbers);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Manejo de clicks para seleccionar/deseleccionar servicios
  const handleServiceCardClick = (serviceId: number) => {
    const current = getValues("services");
    const exists = current.some(s => s.serviceId === serviceId);
    if (exists) {
      setValue(
        "services",
        current.filter(s => s.serviceId !== serviceId),
        { shouldValidate: true } // Se valida y actualiza el estado
      );
    } else {
      setValue(
        "services",
        [...current, { serviceId, barberId: "" }],
        { shouldValidate: true } // Se valida y actualiza el estado
      );
    }
  };

  // Asigna un barbero a un servicio específico
  const handleBarberSelect = (serviceId: number, barberId: string) => {
    const currentServices = getValues("services");
    const updated = currentServices.map(currentService =>
      currentService.serviceId === serviceId ? { ...currentService, barberId } : currentService
    );
    setValue("services", updated, { shouldValidate: true });
  }

  // Componente de resumen reutilizable
  const SummaryPanel = () => {
    const selectedServices = getValues("services") as { serviceId: number; barberId?: string }[];
    return (
      <div className="w-full md:w-[500px] bg-gray-50 border border-gray-200 rounded-lg p-6 h-fit md:sticky md:top-8 self-start flex flex-col justify-between min-h-[320px]">
        <div>
          <h3 className="font-bold text-lg mb-2">Resumen</h3>
          <ul className="mb-2">
            {selectedServices.length === 0 ? (
              <li className="text-gray-400">No hay servicios seleccionados</li>
            ) : (
              selectedServices.map((s) => {
                const service = barberServices.find(serv => serv.id === s.serviceId);
                const barber = barbers.find(b => b.id === s.barberId);
                return service ? (
                  <li key={s.serviceId} className="flex flex-col text-sm mb-1">
                    <div className="flex justify-between">
                      <span>{service.name}</span>
                      <span>${service.price?.toFixed(2) ?? '-'}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Barbero:</span>
                      <span>{barber ? barber.name : <span className="text-gray-400">No seleccionado</span>}</span>
                    </div>
                  </li>
                ) : null;
              })
            )}
          </ul>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold">Fecha y hora</span>
            <span>{getValues("dateTime") ? getValues("dateTime") : <span className="text-gray-400">No seleccionada</span>}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span>
              ${selectedServices.reduce((acc, s) => {
                const serv = barberServices.find(serv => serv.id === s.serviceId);
                return acc + (serv?.price || 0);
              }, 0).toFixed(2)}
            </span>
          </div>
        </div>
        <Button
          className="mt-8 transition"
          onClick={nextStep}
          disabled={
            step === 1
              ? selectedServices.length === 0
              : step === 2
                ? selectedServices.length === 0 || selectedServices.some(s => !s.barberId || !/^[0-9a-fA-F-]{36}$/.test(s.barberId))
                : !getValues("dateTime") || selectedServices.length === 0 || selectedServices.some(s => !s.barberId || !/^[0-9a-fA-F-]{36}$/.test(s.barberId))
          }
        >
          Continuar
        </Button>
      </div>
    );
  };

  return (
    <div className="text-black pt-5 pb-12">
      {/* Botón volver arriba a la izquierda, cambia comportamiento según sub-step */}
      <button
        type="button"
        onClick={() => {
          if (step === 2 && barberStepMode === 1) {
            setBarberStepMode(0); // volver a selección global de barbero
          } else if (step > 1) {
            setBarberStepMode(0); // reset sub-step si vuelve de step 2
            prevStep();
          } else {
            router.push("/client/dashboard");
          }
        }}
        className="flex items-center gap-2 mb-4 text-gray-700 hover:text-black transition cursor-pointer bg-transparent hover:bg-gray-300/30 rounded-md px-2 py-2 group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
        <span className="font-medium">Volver</span>
      </button>

      <div className="px-4 md:px-8 lg:px-16 min-h-[calc(100vh-200px)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {(step === 1 || step === 2 || step === 3) && (
            <div className="flex flex-col md:flex-row gap-20 w-full animate-fade-up animate-duration-700 animate-ease-out">
              {/* Parte izquierda dinámica */}
              <div className="flex-1">
                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-8">Paso 1: Selecciona uno o más servicios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {barberServices.map((service, idx) => {
                        const selectedServices = getValues("services");
                        const selected = selectedServices.some(s => s.serviceId === service.id);
                        return (
                          <div
                            key={service.id}
                            className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${idx * 120}ms] 
                              ${selected ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                            onClick={() => handleServiceCardClick(service.id)}
                          >
                            <div className="p-4">
                              <div className="flex gap-16 items-center justify-between">
                                <div className="flex flex-col gap-3">
                                  <div className="flex flex-col gap-1">
                                    <h4 className={`font-semibold text-black group-hover:text-black transition-colors ${selected ? '' : ''}`}>{service.name}</h4>
                                    <p className="text-sm text-gray-500">{service.description || '1hs'}</p>
                                  </div>
                                  <span className="text-md font-medium text-black">desde ${service.price?.toFixed(2) ?? '-'}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  {/* Icono de selección */}
                                  {selected ? (
                                    <Check className="w-7 h-7 text-green-600" />
                                  ) : (
                                    <Plus className="w-7 h-7 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {step === 2 && barberStepMode === 0 && (
                  <>
                    <h2 className="text-2xl font-bold mb-8">Paso 2: Selecciona un barbero</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {/* Card: Primero disponible */}
                      <div
                        className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[0ms] 
                          ${assignAutomatically ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                        onClick={() => setAssignAutomatically((prev) => !prev)}
                      >
                        <div className="flex gap-16 items-center justify-between w-full">
                          <div className="flex flex-col gap-1">
                            <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">Primero disponible</h4>
                            <p className="text-sm text-gray-500">El sistema elegirá el barbero más temprano disponible</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            {assignAutomatically ? (
                              <Check className="w-7 h-7 text-green-600" />
                            ) : (
                              <Plus className="w-7 h-7 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Card: Elegir barbero por servicio (solo si hay más de un servicio) */}
                      {getValues("services").length > 1 && (
                        <div
                          className={`rounded-sm bg-gray-100/40 border border-primary/30 hover:bg-primary/60 transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[60ms]`}
                          onClick={() => setBarberStepMode(1)}
                        >
                          <div className="flex gap-16 items-center justify-between w-full">
                            <div className="flex flex-col gap-1">
                              <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">Elegir barbero por servicio</h4>
                              <p className="text-sm text-gray-500">Selecciona un barbero diferente para cada servicio</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <ArrowLeft className="w-7 h-7 text-gray-400 rotate-180" />
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Mostrar todos los barberos filtrados (para selección global) */}
                      {barbersFiltered.map((barber, bidx) => {
                        // Selección global: si todos los servicios tienen este barberId
                        const selectedServices = getValues("services");
                        const allSelected = selectedServices.length > 0 && selectedServices.every(s => s.barberId === barber.id);
                        return (
                          <div
                            key={barber.id}
                            className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${(bidx+2) * 60}ms] 
                              ${allSelected ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                            onClick={() => {
                              // Asignar este barbero a todos los servicios seleccionados
                              const current = getValues("services");
                              setValue(
                                "services",
                                current.map(item => ({ ...item, barberId: barber.id })),
                                { shouldValidate: true }
                              );
                            }}
                          >
                            <div className="flex gap-16 items-center justify-between w-full">
                              <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">{barber.name}</h4>
                                <p className="text-sm text-gray-500">Barbero</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                {allSelected ? (
                                  <Check className="w-7 h-7 text-green-600" />
                                ) : (
                                  <Plus className="w-7 h-7 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && barberStepMode === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-8">Elegí un barbero por servicio</h2>
                    <div className="flex flex-col gap-6 mt-4">
                      {(getValues("services")).map((service) => {
                        const barberService = barberServices.find(serv => serv.id === service.serviceId);
                        // Filtrar barberos que pueden hacer este servicio
                        const barbersForService = barbers.filter(barber =>
                          barber.services.some(s => s.id === service.serviceId)
                        );
                        return (
                          <div key={service.serviceId} className="mb-6">
                            <p className="mb-2 font-semibold text-lg">{barberService?.name || 'Servicio'}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {barbersForService.map((barber, bidx) => {
                                const selected = service.barberId === barber.id;
                                return (
                                  <div
                                    key={barber.id}
                                    className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${bidx * 60}ms] 
                                      ${selected ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                                    onClick={() => handleBarberSelect(service.serviceId, barber.id)}
                                  >
                                    <div className="flex gap-16 items-center justify-between w-full">
                                      <div className="flex flex-col gap-1">
                                        <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">{barber.name}</h4>
                                        <p className="text-sm text-gray-500">Barbero</p>
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        {selected ? (
                                          <Check className="w-7 h-7 text-green-600" />
                                        ) : (
                                          <Plus className="w-7 h-7 text-gray-400" />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Paso 3: Selecciona una fecha y hora</h2>
                    <input
                      type="datetime-local"
                      {...register("dateTime")}
                      className="w-full p-2 border rounded"
                    />
                    {
                      errors.dateTime && touchedFields.dateTime && (
                        <span className="text-red-500">{errors.dateTime.message}</span>
                      )
                    }
                    <DatePicker />
                  </div>
                )}
              </div>
              {/* Parte derecha resumen */}
              <SummaryPanel/>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Paso 4: Confirmar cita</h2>
              <div className="mb-4 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Resumen de la cita:</h3>
                <ul>
                  {(getValues("services") as { serviceId: number; barberId?: string }[]).map((s) => {
                    const service = barberServices.find(serv => serv.id === s.serviceId);
                    const barber = barbers.find(b => b.id === s.barberId);
                    return (
                      <li key={s.serviceId}>
                        <b>Servicio:</b> {service?.name || '-'} <b>Barbero:</b> {barber?.name || '-'}
                      </li>
                    );
                  })}
                  <li><b>Fecha y hora:</b> {getValues("dateTime") || "-"}</li>
                </ul>
              </div>
              <Button
                type="submit"
              >
                Confirmar cita
              </Button>
            </div>
          )}
        </form>
      </div>

    </div>
  )
}
