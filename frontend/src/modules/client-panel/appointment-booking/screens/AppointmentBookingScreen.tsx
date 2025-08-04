"use client";
import { useState } from "react"
import { Plus, Check, ArrowLeft } from "lucide-react";
import { GetService } from "@/modules/services/services.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useAuthStore } from "@/modules/auth/auth.store";
import { GetBarber } from "@/modules/barbers/barbers.type";
import { Button } from "@/core/components/Button";
import { DatePicker } from "@/core/components/DatePicker";
import { SummaryPanel } from "@/modules/client-panel/appointment-booking/components/SummaryPanel";
import { CreateAppointmentFormData, createAppointmentSchema } from "../schemas/createAppointment.schema";
import { BookingBackButton } from "../components/BookingBackButton";
import { SelectServices } from "../components/SelectServices";

interface AppointmentBookingScreenProps {
  services: GetService[];
  barbers: GetBarber[];
}

export default function AppointmentBookingScreen({ services, barbers }: AppointmentBookingScreenProps) {

  const [step, setStep] = useState(1);
  // Track last selected service IDs to detect changes
  const [lastServiceIds, setLastServiceIds] = useState<number[]>([]);
  // Estado para saber si se seleccionó "Primero disponible"
  const userAuthenticated = useAuthStore().userAuthenticated;

  const [barbersFiltered, setBarbersFiltered] = useState<GetBarber[]>(barbers);
 
  const [isSelectingBarberPerService, setIsSelectingBarberPerService] = useState(false);

  const formMethods = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      userId: userAuthenticated?.id,
      services: [],
      assignAutomatically: false,
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    getValues,
    setValue,
  } = formMethods;

  const nextStep = async () => {
    // Actualizar barberos filtrados y lastServiceIds solo en el paso 1
    if (step === 1) {
      const selectedServices = getValues("services");
      const idSelectedServices = selectedServices.map(s => s.serviceId);
      const barbersFiltered = barbers.filter(barber =>
        idSelectedServices.every(selectedId =>
          barber.services.some(service => service.id === selectedId)
        )
      );
      setBarbersFiltered(barbersFiltered);
      setLastServiceIds(idSelectedServices);
    }

    // Validar el formulario según el paso actual
    let isValid = false;
    if (step === 1) {
      isValid = await trigger("services");
    } else if (step === 2) {
      isValid = await trigger("services");
    } else if (step === 3) {
      isValid = await trigger("dateTime");
    } else {
      isValid = true;
    }

    // Si vamos de step 1 a step 2, y la combinación de servicios cambió, reiniciar barberos
    if (step === 1 && isValid) {
      const selectedServices = getValues("services");
      const idSelectedServices = selectedServices.map(s => s.serviceId).sort();
      const lastIdsSorted = [...lastServiceIds].sort();
      const changed = idSelectedServices.length !== lastIdsSorted.length || idSelectedServices.some((id, i) => id !== lastIdsSorted[i]);
      if (changed) {
        setValue(
          "services",
          selectedServices.map(s => ({ serviceId: s.serviceId, barberId: "" })),
          { shouldValidate: true }
        );
        setValue("assignAutomatically", false, { shouldValidate: false });
      }
    }

    if (isValid) setStep((prev) => prev + 1);
  }

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (newAppointment: CreateAppointmentFormData) => {
    const localDate = new Date(newAppointment.dateTime);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    // Limpiar barberId si assignAutomatically es true
    const servicesToSend = newAppointment.services.map(service => ({
      serviceId: service.serviceId,
      barberId: getValues("assignAutomatically") ? undefined : service.barberId,
    }));

    const appointmentToSend = {
      dateTime: utcDate,
      userId: newAppointment.userId,
      services: servicesToSend,
      assignAutomatically: getValues("assignAutomatically"),
    };

    console.log("Formulario enviado:", appointmentToSend);
    alert("Formulario enviado exitosamente!");

    // AppointmentsService.create(appointmentToSend);
  }

  // Asigna un barbero a un servicio específico
  const handleBarberSelect = (serviceId: number, barberId: string) => {
    const currentServices = getValues("services");
    const updated = currentServices.map(currentService =>
      currentService.serviceId === serviceId ? { ...currentService, barberId } : currentService
    );
    setValue("services", updated, { shouldValidate: true });
    // Si se selecciona un barbero, desactivar la opción "Primero disponible"
    if (getValues("assignAutomatically")) {
      setValue("assignAutomatically", false, { shouldValidate: false });
    }
  }

  const handelAutomaticAssignToggle = () => {
      setValue("assignAutomatically", !getValues("assignAutomatically"), { shouldValidate: true });
      setValue(
        "services",
        getValues("services").map(s => ({ ...s, barberId: "" })),
        { shouldValidate: true }
      );
  }

  return (
    <FormProvider {...formMethods}>
      <div className="text-black pt-5 pb-12">

        <BookingBackButton
          step={step}
          setIsSelectingBarberPerService={setIsSelectingBarberPerService}
          isSelectingBarberPerService={isSelectingBarberPerService}
          prevStep={prevStep}
        />

        <div className="px-4 md:px-8 lg:px-16 min-h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {(step === 1 || step === 2 || step === 3) && (
              <div className="flex flex-col md:flex-row gap-20 w-full animate-fade-up animate-duration-700 animate-ease-out">
                {/* Parte izquierda dinámica */}
                <div className="flex-1">
                  {step === 1 && (
                    <SelectServices services={services} />
                  )}
                  {step === 2 && !isSelectingBarberPerService && (
                    <>
                      <h2 className="text-2xl font-bold mb-8">Paso 2: Selecciona un barbero</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {/* Card: Primero disponible */}
                        <div
                          className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[0ms] 
                            ${getValues("assignAutomatically") ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                          onClick={handelAutomaticAssignToggle}
                        >
                          <div className="flex gap-16 items-center justify-between w-full">
                            <div className="flex flex-col gap-1">
                              <h4 className="font-semibold text-black group-hover:text-black transition-colors text-lg">Primero disponible</h4>
                              <p className="text-sm text-gray-500">El sistema elegirá el barbero más temprano disponible</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              {getValues("assignAutomatically") ? (
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
                            onClick={() => setIsSelectingBarberPerService(true)}
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
                          const allSelected = selectedServices.length > 0 && selectedServices.every(s => s.barberId === barber.id) && !getValues("assignAutomatically");
                          return (
                            <div
                              key={barber.id}
                              className={`rounded-sm bg-gray-100/40 border transition-all cursor-pointer group flex flex-col items-center p-4 animate-fade-up animate-duration-700 animate-ease-out animate-delay-[${(bidx+2) * 60}ms] 
                                ${allSelected ? 'border-primary bg-primary/60' : 'border-primary/30 hover:bg-primary/60'}`}
                              onClick={() => {
                                // Asignar este barbero a todos los servicios seleccionados
                                if (getValues("assignAutomatically")) {
                                  setValue("assignAutomatically", false, { shouldValidate: false });
                                }
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

                  {step === 2 && isSelectingBarberPerService && (
                    <>
                      <h2 className="text-2xl font-bold mb-8">Elegí un barbero por servicio</h2>
                      <div className="flex flex-col gap-6 mt-4">
                        {(getValues("services")).map((service) => {
                          const barberService = services.find(serv => serv.id === service.serviceId);
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
                <SummaryPanel
                  services={services}
                  barbers={barbers}
                  step={step}
                  nextStep={nextStep}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Paso 4: Confirmar cita</h2>
                <div className="mb-4 p-4 border rounded bg-gray-50">
                  <h3 className="font-semibold mb-2">Resumen de la cita:</h3>
                  <ul>
                    {(getValues("services") as { serviceId: number; barberId?: string }[]).map((s) => {
                      const service = services.find(serv => serv.id === s.serviceId);
                      const barber = barbers.find(b => b.id === s.barberId);
                      return (
                        <li key={s.serviceId}>
                          <b>Servicio:</b> {service?.name || '-'} <b>Barbero:</b> {barber?.name || ''} {getValues("assignAutomatically") ? 'Primero disponible' : ''}
                        </li>
                      );
                    })}
                    <li><b>Fecha y hora:</b> {getValues("dateTime") || "-"}</li>
                  </ul>
                  {/* Mostrar errores de validación si existen */}
                  {Object.keys(errors).length > 0 && (
                    <div className="mt-4 text-red-600">
                      <b>Errores en el formulario:</b>
                      <ul className="list-disc ml-6">
                        {errors.services && (
                          <li>Debes seleccionar al menos un servicio y un barbero (o primero disponible).</li>
                        )}
                        {errors.dateTime && (
                          <li>{errors.dateTime.message}</li>
                        )}
                        {/* Puedes agregar más mensajes según tu schema */}
                      </ul>
                    </div>
                  )}
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
    </FormProvider>
  )
}
