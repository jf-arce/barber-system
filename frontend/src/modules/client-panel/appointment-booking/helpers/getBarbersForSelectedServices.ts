import { GetBarber } from "@/modules/barbers/barbers.type";

export function getBarbersForSelectedServices(barbers: GetBarber[], selectedServiceIds: number[]) {
    return barbers.filter(barber =>
        selectedServiceIds.every(selectedId =>
            barber.services.some(service => service.id === selectedId)
        )
    );
}