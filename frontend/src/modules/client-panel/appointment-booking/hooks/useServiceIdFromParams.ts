import { useSearchParams } from "next/navigation";

export function useServiceIdFromParams() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  return serviceId ? Number(serviceId) : null;
}
