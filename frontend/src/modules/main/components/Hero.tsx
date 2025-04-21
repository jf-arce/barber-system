import { COLORS } from "@/constants/colors";
import Image from "next/image";
import Link from "next/link";
import { Button } from "quick-ui-components";

export const Hero = () => {
    return (
        <>
            <Image
                src="/images/image-main.jpg"
                alt="Barber"
                width={1920}
                height={1080}
                className="absolute top-0 left-0 -z-50 object-cover h-full"
            />
            <div className="bg-black absolute top-0 h-full w-full opacity-60 -z-40"></div>
            <div className="flex flex-col gap-2 justify-center items-center h-full absolute top-0 w-full font-bold">
                <h1 className="text-6xl">BarberLP</h1>
                <h2 className="text-center text-2xl font-bold p-10">No solo cortamos pelo, creamos estilo</h2>
                <Button
                    asChild
                    radius="sm"
                    colorBg={COLORS.primary}
                    colorText="black"
                    pulse={false}
                    size="md"
                >
                    <Link href="/">
                        Reserva tu cita
                    </Link>
                </Button>
            </div>
        </>
    )
}
