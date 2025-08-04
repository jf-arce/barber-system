export function isBarbershopOpen() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 8 && hour < 18;
}