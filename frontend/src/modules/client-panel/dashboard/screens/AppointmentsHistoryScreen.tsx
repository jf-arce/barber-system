"use client"

import dayjs from "dayjs"
import "dayjs/locale/es"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/Table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/core/components/Dialog"
import { Button } from "@/core/components/Button"
import { Badge } from "@/core/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/Card"
import { Separator } from "@/core/components/Separator"
import { Clock, Calendar, DollarSign, User, Scissors, ArrowLeft, RotateCcw, X } from "lucide-react"
import { useClientPanelStore } from "../../stores/client-panel.store"
import { GetAppointment } from "@/modules/appointments/appointments.type"
import Link from "next/link"
import { useEffect } from "react"
import { useAuthStore } from "@/modules/auth/auth.store"
import { useAppointmentActions } from "@/modules/appointments/hooks/useAppointmentActions"
import { AppointmentStatus } from "@/modules/appointments/appointments.type";
import { Input } from "@/core/components/Input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/core/components/AlertDialog";

const getStatusBadge = (status: GetAppointment["status"]) => {
    const variants = {
        Completado: "bg-success text-success-foreground",
        Confirmado: "bg-warning text-warning-foreground",
        Cancelado: "bg-destructive text-destructive-foreground",
    }

    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(amount)
}

const formatDuration = (startDateTime: string | undefined, endDateTime: string | undefined) => {
    let durationStr = "";
    if (startDateTime && endDateTime) {
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        if (hours > 0) {
            durationStr += `${hours} ${hours === 1 ? "hora" : "horas"}`;
        }
        if (hours > 0 && mins > 0) {
            durationStr += " ";
        }
        if (mins > 0) {
            durationStr += `${mins} min`;
        }
    }
    return durationStr;
}

export function AppointmentsHistoryScreen() {

  const userAuthenticated = useAuthStore().userAuthenticated;
  const fetchAppointments = useClientPanelStore((state) => state.fetchAppointments);
  const appointments = useClientPanelStore((state) => state.appointments);
  const {
    newDateTime,
    setNewDateTime,
    handleCancelAppointment,
    handleRescheduleAppointment,
  } = useAppointmentActions(() => fetchAppointments(userAuthenticated?.id || ''));

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments(userAuthenticated?.id || '');
    };
    fetchData();
  }, [userAuthenticated?.id]);

    return (
        <div className="pt-5 pb-20 min-h-screen">
            {/* Botón de volver */}
            <Link
                href="/client/dashboard"
                className="flex items-center gap-2 mb-5 text-gray-700 hover:text-black transition cursor-pointer group"
            >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="font-medium">Volver al Dashboard</span>
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Mis Citas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha Solicitud</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha Cita</TableHead>
                                    <TableHead>Hora</TableHead>
                                    <TableHead>Precio Total</TableHead>
                                    <TableHead>Duración</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appointment) => {
                                    const totalPrice = appointment.appointmentDetails.reduce((sum, ad) => sum + ad.service.price, 0);
                                    const totalDurationFormatted = formatDuration(
                                        appointment.appointmentDetails[0].startDateTime,
                                        appointment.appointmentDetails[0].endDateTime
                                    );
                                    return (
                                        <TableRow key={appointment.id}>
                                            <TableCell>{dayjs(appointment.createdAt).locale("es").format("DD/MM/YYYY")}</TableCell>
                                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                                            <TableCell>{dayjs(appointment.appointmentDetails[0].startDateTime).locale("es").format("DD/MM/YYYY")}</TableCell>
                                            <TableCell>{dayjs(appointment.appointmentDetails[0].startDateTime).locale("es").format("HH:mm")}</TableCell>
                                            <TableCell className="font-semibold">{formatCurrency(totalPrice)}</TableCell>
                                            <TableCell>{totalDurationFormatted}</TableCell>
                                            <TableCell className="text-right">
                                              <div className="flex gap-2 justify-end items-center">
                                                {appointment.status === AppointmentStatus.CONFIRMED && (
                                                  <>
                                                    <AlertDialog>
                                                      <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="rounded-sm">
                                                          <RotateCcw className="h-4 w-4" />
                                                        </Button>
                                                      </AlertDialogTrigger>
                                                      <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                          <AlertDialogTitle>¿Quieres reprogramar la cita?</AlertDialogTitle>
                                                          <AlertDialogDescription>
                                                            Selecciona la nueva fecha y hora para tu cita.
                                                          </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <form onSubmit={(e) => handleRescheduleAppointment(e, appointment.id)} className="flex flex-col gap-4 mt-2">
                                                          <Input
                                                            type="datetime-local"
                                                            value={newDateTime}
                                                            onChange={e => setNewDateTime(e.target.value)}
                                                            required
                                                          />
                                                          <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                              <Button type="submit">Confirmar</Button>
                                                            </AlertDialogAction>
                                                          </AlertDialogFooter>
                                                        </form>
                                                      </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                      <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm" className="rounded-sm">
                                                          <X className="h-4 w-4" />
                                                        </Button>
                                                      </AlertDialogTrigger>
                                                      <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                          <AlertDialogTitle>
                                                            ¿Estás seguro de que deseas cancelar la cita?
                                                          </AlertDialogTitle>
                                                          <AlertDialogDescription>
                                                            Esta acción no se puede deshacer.
                                                            Una vez cancelada, deberás reservar una nueva cita si lo deseas.
                                                          </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                          <AlertDialogAction onClick={() => handleCancelAppointment(appointment.id)}>Continuar</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                      </AlertDialogContent>
                                                    </AlertDialog>
                                                  </>
                                                )}
                                                <Dialog>
                                                  <DialogTrigger asChild>
                                                    <Button variant="default" size="sm" className="rounded-sm ml-2">
                                                      Detalles
                                                    </Button>
                                                  </DialogTrigger>
                                                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto text-foreground">
                                                      <DialogHeader>
                                                          <DialogTitle className="flex items-center gap-2">
                                                              <Scissors className="h-5 w-5 text-primary" />
                                                              Detalles de la Cita
                                                          </DialogTitle>
                                                          <DialogDescription>Información completa de los servicios solicitados</DialogDescription>
                                                      </DialogHeader>

                                                      <div className="space-y-6">
                                                          {/* Información general */}
                                                          <div className="grid grid-cols-2 gap-4">
                                                              <div className="flex items-center gap-2">
                                                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                  <span className="text-sm">
                                                                      {dayjs(appointment.appointmentDetails[0].startDateTime).locale("es").format("DD/MM/YYYY")}
                                                                  </span>
                                                              </div>
                                                              <div className="flex items-center gap-2">
                                                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                                                  <span className="text-sm">{dayjs(appointment.appointmentDetails[0].startDateTime).locale("es").format("HH:mm")}</span>
                                                              </div>
                                                              <div className="flex items-center gap-2">
                                                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                  <span className="text-sm font-semibold">{formatCurrency(totalPrice)}</span>
                                                              </div>
                                                              <div className="flex items-center gap-2">{getStatusBadge(appointment.status)}</div>
                                                          </div>

                                                          <Separator />

                                                          {/* Lista de servicios */}
                                                          <div>
                                                              <h4 className="font-semibold mb-4">Servicios Solicitados</h4>
                                                              <div className="space-y-4">
                                                                  {appointment.appointmentDetails.map((detail) => (
                                                                      <Card key={detail.startDateTime + detail.endDateTime + detail.service.name} className="border-l-4 border-l-primary">
                                                                          <CardContent className="pt-4">
                                                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                  <div>
                                                                                      <h5 className="font-semibold text-lg mb-2">{detail.service.name}</h5>
                                                                                      <div className="space-y-2 text-sm">
                                                                                          <div className="flex items-center gap-2">
                                                                                              <User className="h-4 w-4 text-muted-foreground" />
                                                                                              <span>{detail.barber.name}</span>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                                              <span className="font-semibold">{formatCurrency(detail.service.price)}</span>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                              <Clock className="h-4 w-4 text-muted-foreground" />
                                                                                              <span>{formatDuration(detail.startDateTime, detail.endDateTime)}</span>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                                  <div className="space-y-2">
                                                                                      <div className="text-sm">
                                                                                          <span className="font-medium">Hora de inicio:</span>
                                                                                          <span className="ml-2">{dayjs(detail.startDateTime).locale("es").format("HH:mm")}</span>
                                                                                      </div>
                                                                                      <div className="text-sm">
                                                                                          <span className="font-medium">Hora de fin:</span>
                                                                                          <span className="ml-2">{dayjs(detail.endDateTime).locale("es").format("HH:mm")}</span>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          </CardContent>
                                                                      </Card>
                                                                  ))}
                                                              </div>
                                                          </div>

                                                          {/* Resumen */}
                                                          <Separator />
                                                          <div className="bg-muted/50 p-4 rounded-lg">
                                                              <div className="flex justify-between items-center">
                                                                  <span className="font-semibold">Total de la Cita:</span>
                                                                  <div className="text-right">
                                                                      <div className="font-bold text-lg">{formatCurrency(totalPrice)}</div>
                                                                      <div className="text-sm text-muted-foreground">
                                                                          Duración: {totalDurationFormatted}
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </DialogContent>
                                                </Dialog>
                                              </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}