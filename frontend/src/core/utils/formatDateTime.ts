export function formatDateTime(
    dateString: string,
    locale: string = "es-AR"
) {
    const date = new Date(dateString);

    return date.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        hourCycle: "h24",
    });
}