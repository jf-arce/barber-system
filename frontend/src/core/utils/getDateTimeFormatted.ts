import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDateTimeFormatted = (datetimeUTC: string) => {
    const dateArgentina = datetimeUTC
        ? dayjs
            .utc(datetimeUTC)
            .tz("America/Argentina/Buenos_Aires")
            .locale("es")
            .format("dddd, D [de] MMMM, YYYY, HH:mm")
            // Capitalizar primera letra
            .replace(/^./, (c) => c.toUpperCase())
            // Capitalizar primera letra del mes
            .replace(/ de ([a-z]+)/, (match, p1) => ` de ${p1.charAt(0).toUpperCase() + p1.slice(1)}`)
        : "";

    const parts = dateArgentina.split(",");
    const date = parts[0] + "," + parts[1]
    const year = parts[2]?.trim();
    const hour = parts[3]?.trim();

    return {
        date,
        year,
        hour,
    };
};
