import Image from "next/image";
import Link from "next/link";
import { Button } from "@/core/components/Button";

export const Hero = () => {
    return (
        <>
            <Image
                src="/images/image-main.webp"
                alt="Barber"
                width={1920}
                height={1080}
                className="absolute top-0 left-0 -z-50 object-cover h-full w-full"
            />
            <div className="bg-black absolute top-0 h-full w-full opacity-60 -z-40"></div>
            <div className="flex flex-col gap-2 justify-center items-center h-full absolute top-0 w-full font-bold">
                <h1 className="text-6xl opacity-0 animate-fade-up animate-once animate-duration-700 animate-fill-forwards">BarberLP</h1>
                <h2 className="text-center text-2xl font-bold p-10 opacity-0 animate-fade-up animate-once animate-duration-700 animate-delay-200 animate-fill-forwards">No solo cortamos pelo, creamos estilo</h2>
                <div className="opacity-0 animate-fade-up animate-once animate-duration-700 animate-delay-400 animate-fill-forwards">
                    <Button
                    asChild
                        className="!text-black !px-5"
                    >
                        <Link href="/booking">Reserva tu cita</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
