import { BarbersService } from '@/modules/barbers/barbers.service';
import AppointmentBookingScreen from '@/modules/client-panel/appointment-booking/screens/AppointmentBookingScreen'
import { ServicesService } from '@/modules/services/services.service';

export const dynamic = 'force-dynamic';

async function AppointmentBookingPage() {
  const services = await ServicesService.getAll();
  const barbers = await BarbersService.getAll();

  return (
    <AppointmentBookingScreen services={services} barbers={barbers} />
  )
}

export default AppointmentBookingPage;