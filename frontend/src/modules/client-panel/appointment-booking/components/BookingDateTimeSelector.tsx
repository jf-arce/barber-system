"use client"
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { BookingDatePicker } from './BookingDatePicker'
import { CreateAppointmentFormData } from '../schemas/createAppointment.schema';
import { Button } from '@/core/components/Button';
import { GetBarbersAvailability } from '@/modules/appointments/appointments.type';
import { AppointmentsService } from '@/modules/appointments/appointments.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const BookingDateTimeSelector = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { watch, setValue, getValues } = useFormContext<CreateAppointmentFormData>();

  const [currentDatePicker, setCurrentDatePicker] = useState<string | null>(null);
  const [getBarbersAvailability, setGetBarbersAvailability] = useState<GetBarbersAvailability>({
    date: "",
    availableSlots: []
  });

  useEffect(() => {
    if (currentDatePicker) {
      const servicesWithBarbers = getValues("services").map(service => ({
        serviceId: service.serviceId,
        barberId: service.barberId || null
      }));

      AppointmentsService.checkBarbersAvailability({
        date: currentDatePicker,
        servicesWithBarberDto: servicesWithBarbers,
        assignBarberAutomatically: getValues("assignAutomatically")
      }).then((barbersSlotsAvailability) => {
        setGetBarbersAvailability(barbersSlotsAvailability)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDatePicker])

  useEffect(() => {
    const startDateTime = getValues("startDateTime");
    if (startDateTime) {
      const localDate = dayjs(startDateTime).tz('America/Argentina/Buenos_Aires');
      setCurrentDatePicker(localDate.format('YYYY-MM-DD'));
      setSelectedSlot(localDate.format('HH:mm'));
    } else {
      setSelectedSlot(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("startDateTime")]);

  const handleDateTimeSelect = (slot: { start: string; end: string }) => {
    const startDateTime = `${currentDatePicker}T${slot.start}`;
    const endDateTime = `${currentDatePicker}T${slot.end}`;
    
    const isoStartDateTime = dayjs(startDateTime).millisecond(0).toISOString();
    const isoEndDateTime = dayjs(endDateTime).millisecond(0).toISOString();

    setValue("startDateTime", isoStartDateTime);
    setValue("endDateTime", isoEndDateTime);
    setSelectedSlot(slot.start);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Paso 3: Selecciona una fecha y hora</h2>
      <div className="space-y-4">
        <BookingDatePicker
          value={watch("startDateTime")}
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
                        className={`w-full transition-colors ${selectedSlot === barberAvailability.start.split(":").slice(0,2).join(":") ? 'bg-primary' : ''} hover:bg-primary/80`}
                        onClick={() => handleDateTimeSelect(barberAvailability)}>
                        {barberAvailability.start.split(":").slice(0, 2).join(":")}
                      </Button>
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
