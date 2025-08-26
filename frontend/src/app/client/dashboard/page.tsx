"use client"
import { ClientDashboardScreen } from "@/modules/client-panel/dashboard/screens/ClientDashboardScreen";
import { ServicesService } from "@/modules/services/services.service";
import { GetService } from "@/modules/services/services.type";
import { useEffect, useState } from "react";

// export const dynamic = 'force-dynamic';

export default function ClientDashboardPage() {
  // const services = await ServicesService.getAll();
  const [services, setServices] = useState<GetService[]>([]);
   useEffect(() => {
     ServicesService.getAll().then((data) => {
       setServices(data);
     });
   }, []);

  return (
    <ClientDashboardScreen 
      services={services} 
    />
  );
}
