import { BarbersSelection } from "@/modules/client/components/BarbersSelection";
import { NextAppointment } from "@/modules/client/components/NextAppointment";
import { AppointmentsHistory } from "@/modules/client/components/AppointmentsHistory";
import { RecommendedServices } from "@/modules/client/components/RecommendedServices";
import { DashboardHeader } from "@/modules/client/components/DashboardHeader";
import { DashboardHeaderResponsive } from "@/modules/client/components/DashboardHeaderResponsive";

export default function ClientDashboardPage() {
  return (
    <div className="pt-10 pb-20 min-h-screen">
      
      <DashboardHeaderResponsive />

      <section className="flex flex-col-reverse lg:flex-row gap-8 min-h-[calc(100vh-200px)]">
        
        <div className="lg:w-2/3 w-full space-y-4">

          <DashboardHeader />

          <RecommendedServices />

          <BarbersSelection />

        </div>

        <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
          <div className="sticky top-8">

            <NextAppointment />
          
            <AppointmentsHistory />

          </div>
        </div>
        
      </section>

    </div>
  );
}
