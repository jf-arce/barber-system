"use client"
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { BookingDatePicker } from './BookingDatePicker'
import { CreateAppointmentFormData } from '../schemas/createAppointment.schema';
import { Button } from '@/core/components/Button';
import { GetBarbersAvailability } from '@/modules/appointments/appointments.type';
import { AppointmentsService } from '@/modules/appointments/appointments.service';

export const BookingDateTimeSelector = () => {

  const { watch, setValue, getValues } = useFormContext<CreateAppointmentFormData>();

  const [currentDatePicker, setCurrentDatePicker] = useState<string | null>(null);
  const [getBarbersAvailability, setGetBarbersAvailability] = useState<GetBarbersAvailability>({
    date: "",
    availableSlots: []
  });
  console.log(getBarbersAvailability)

  useEffect(() => {
    const isAssigningBarber = getValues("assignAutomatically");

    if (currentDatePicker && !isAssigningBarber) {
      const servicesWithBarbers = getValues("services").map(service => ({
        serviceId: service.serviceId,
        barberId: service.barberId as string
      }));

      AppointmentsService.checkBarbersAvailability({
        date: currentDatePicker,
        servicesWithBarberDto: servicesWithBarbers
      }).then((barbersSlotsAvailability) => {
        setGetBarbersAvailability(barbersSlotsAvailability)
      })
    }
  }, [currentDatePicker, getValues])

  const handleDateTimeSelect = (slot: { start: string; end: string }) => {
    //Tenemos que unir la fecha con el start en un DateTimeUtc
    const dateTime = `${currentDatePicker}T${slot.start}`;
    const isoDateTime = new Date(dateTime).toISOString();
    console.log(isoDateTime);
    setValue("dateTime", isoDateTime);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Paso 3: Selecciona una fecha y hora</h2>
      <div className="space-y-4">
        <BookingDatePicker
          value={watch("dateTime")}
          setCurrentDatePicker={setCurrentDatePicker}
        />
        {currentDatePicker && (
          <div>
            {
              getBarbersAvailability.availableSlots.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {getBarbersAvailability.availableSlots.map((barberAvailability, idx) => (
                    <li key={idx}>
                      <Button 
                        variant="outline"
                        className="w-full hover:bg-primary" 
                        onClick={() => handleDateTimeSelect(barberAvailability)}>
                        {barberAvailability.start.split(":").slice(0, 2).join(":")}
                      </Button>
                      {/* {barberAvailability.start} - {barberAvailability.end} */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay barberos disponibles en este horario.</p>
              )}

          </div>
        )}
      </div>
    </div>
  )
}
