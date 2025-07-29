"use client";
import { useState } from "react";

const BarberHoursOfTheDay = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00"
];

// Mock de horarios ocupados por día
const bookedHoursByDate: Record<string, string[]> = {
  "2025-07-30": ["09:00", "13:00"],
  "2025-07-31": ["10:00", "14:00", "16:00"],
  // Puedes agregar más fechas y horarios ocupados aquí
};

export function DatePicker() {
  const [date, setDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  // Obtener horarios ocupados para la fecha seleccionada
  const bookedHours = bookedHoursByDate[date] || [];

  // Filtrar horarios disponibles
  const availableHours = BarberHoursOfTheDay.filter(
    (hour) => !bookedHours.includes(hour)
  );

  // Fecha mínima (hoy)
  const minDate = new Date();
  minDate.setMinutes(0);
  minDate.setSeconds(0);
  minDate.setMilliseconds(0);
  const min = minDate.toISOString().slice(0, 10); // formato YYYY-MM-DD

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setSelectedHour(""); // resetear hora al cambiar fecha
        }}
        min={min}
        className="w-full px-4 py-2 border  rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      {date && (
        <ul className="mt-4 space-y-2">
          {availableHours.length === 0 ? (
            <li className="text-gray-500">No hay horarios disponibles</li>
          ) : (
            availableHours.map((hour) => (
              <li key={hour}>
                <button
                  type="button"
                  className={`w-full px-4 py-2 rounded ${
                    selectedHour === hour
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
