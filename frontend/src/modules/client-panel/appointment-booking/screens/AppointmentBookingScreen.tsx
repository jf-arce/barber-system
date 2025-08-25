"use client";
import { GetService } from "@/modules/services/services.type"
import { FormProvider } from "react-hook-form"
import { GetBarber } from "@/modules/barbers/barbers.type";
import { Button } from "@/core/components/Button";
import { SummaryPanel } from "@/modules/client-panel/appointment-booking/components/SummaryPanel";
import { BookingBackButton } from "../components/BookingBackButton";
import { SelectServices } from "../components/SelectServices";
import { AutomaticAssignCard } from "../components/AutomaticAssignCard";
import { BarberPerServiceSelector } from "../components/BarberPerServiceSelector";
import { SelectBarber } from "../components/SelectBarber";
import { ArrowLeftIcon } from "@/core/components/Icons";
import { useAppointmentBookingForm } from "../hooks/useAppointmentBookingForm";
import { useServiceIdFromParams } from "../hooks/useServiceIdFromParams";
import { useEffect } from "react";
import { getDateTimeFormatted } from "@/core/utils/getDateTimeFormatted";
import { BookingDateTimeSelector } from "../components/BookingDateTimeSelector";

interface AppointmentBookingScreenProps {
  services: GetService[];
  barbers: GetBarber[];
}

export default function AppointmentBookingScreen({
  services,
  barbers
}: AppointmentBookingScreenProps) {


  const {
    step,
    nextStep,
    prevStep,
    barbersFiltered,
    isSelectingBarberPerService,
    setIsSelectingBarberPerService,
    formMethods,
    handleSubmitForm,
    watch,
  } = useAppointmentBookingForm({ barbers });

  const serviceIdFromParams = useServiceIdFromParams();

  useEffect(() => {
    if (serviceIdFromParams && watch("services").length === 0) {
      const serviceExists = services.some(s => s.id === serviceIdFromParams);
      if (serviceExists) {
        formMethods.setValue("services", [{ serviceId: serviceIdFromParams, barberId: "" }], { shouldValidate: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceIdFromParams]);

  return (
    <FormProvider {...formMethods}>
      <div className="text-black pt-5 pb-12">

        <BookingBackButton
          step={step}
          setIsSelectingBarberPerService={setIsSelectingBarberPerService}
          isSelectingBarberPerService={isSelectingBarberPerService}
          prevStep={prevStep}
        />

        <div className="min-h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmitForm}>
            {(step === 1 || step === 2 || step === 3) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full animate-fade-up animate-duration-700 animate-ease-out">
                <div className="flex-1 relative">
                  {step === 1 && (
                    <SelectServices services={services} />
                  )}
                  {step === 2 && !isSelectingBarberPerService && (
                    <>
                      <h2 className="text-2xl font-bold mb-8">Paso 2: Selecciona un barbero</h2>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                        <AutomaticAssignCard />

                        {watch("services").length > 1 && (
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
                                <ArrowLeftIcon className="w-7 h-7 text-gray-400 rotate-180" />
                              </div>
                            </div>
                          </div>
                        )}

                        <SelectBarber barbersFiltered={barbersFiltered} />
                      </div>
                    </>
                  )}

                  {step === 2 && isSelectingBarberPerService && (
                    <BarberPerServiceSelector
                      services={services}
                      barbers={barbers}
                    />
                  )}

                  {step === 3 && (
                    <BookingDateTimeSelector />
                  )}
                </div>

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
                    {(watch("services")).map((s) => {
                      const service = services.find(serv => serv.id === s.serviceId);
                      const barber = barbers.find(b => b.id === s.barberId);
                      return (
                        <li key={s.serviceId}>
                          <div>
                            <b>Servicio:</b> {service?.name || '-'}
                          </div>
                          <div>
                            <b>Barbero:</b> {barber?.name || ''}
                            {watch("assignAutomatically") ? ' (Primero disponible)' : ''}
                          </div>
                        </li>
                      );
                    })}
                    <li>
                      <b>Fecha:</b> 
                      {getDateTimeFormatted(watch("startDateTime")).date || "-"}
                      <br />
                      <b>Hora:</b> {getDateTimeFormatted(watch("startDateTime")).hour || "-"}
                    </li>
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
    </FormProvider>
  )
}
