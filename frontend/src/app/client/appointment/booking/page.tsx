"use client"
import { BarbersService } from '@/modules/barbers/barbers.service';
import { GetBarber } from '@/modules/barbers/barbers.type';
import AppointmentBookingScreen from '@/modules/client-panel/appointment-booking/screens/AppointmentBookingScreen'
import { ServicesService } from '@/modules/services/services.service';
import { GetService } from '@/modules/services/services.type';
import { useEffect, useState } from 'react';

// export const dynamic = 'force-dynamic';

export default function AppointmentBookingPage() {
  const [services, setServices] = useState<GetService[]>([]);
  const [barbers, setBarbers] = useState<GetBarber[]>([]);

  useEffect(() => {
    ServicesService.getAll().then((data) => {
      setServices(data);
    });
    BarbersService.getAll().then((data) => {
      setBarbers(data);
    });
  }, []);

  return (
    <AppointmentBookingScreen services={services} barbers={barbers} />
  )
}