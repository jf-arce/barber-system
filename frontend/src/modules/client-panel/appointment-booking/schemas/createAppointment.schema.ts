import { z } from "zod";


export const createAppointmentSchema = z.object({
    startDateTime: z.string().min(3, "La fecha y hora son requeridas").max(100),
    endDateTime: z.string().min(3, "La fecha y hora de fin son requeridas").max(100),
    userId: z.string().uuid("Se debe seleccionar un usuario"),
    services: z.array(z.object({
        serviceId: z.number().int("El ID del servicio debe ser un número entero"),
        barberId: z.string().uuid("Se debe seleccionar un barbero para el servicio").nullable().or(z.literal("")),
    })).min(1, "Se debe seleccionar al menos un servicio"),
    assignAutomatically: z.boolean(),
}).superRefine((data, ctx) => {
    if (!data.assignAutomatically) {
        data.services.forEach((service, idx) => {
            if (!service.barberId || !/^[0-9a-fA-F-]{36}$/.test(service.barberId)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Se debe seleccionar un barbero para el servicio",
                    path: ["services", idx, "barberId"]
                });
            }
        });
    }
});

export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;