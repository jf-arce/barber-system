import { useRouter } from "next/navigation";

export function useBookingNavigation() {
  const router = useRouter();
  function goToBooking(serviceId: number) {
    router.push(`/client/appointment/booking?serviceId=${serviceId}`);
  }
  return { goToBooking };
}
