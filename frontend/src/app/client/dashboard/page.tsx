import { ClientDashboardScreen } from "@/modules/client-panel/dashboard/screens/ClientDashboardScreen";
import { ServicesService } from "@/modules/services/services.service";

export default async function ClientDashboardPage() {
  const services = await ServicesService.getAll();
  
  return (
    <ClientDashboardScreen services={services}/>
  );
}
