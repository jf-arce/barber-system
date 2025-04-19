import { MainContainer } from "@/components/containers/MainContainer";
import { MainNavbar } from "@/components/MainNavbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <MainNavbar />
      <div className="relative max-h-[500px] overflow-hidden">
        <Image 
          src="/images/image-main.jpg"
          alt="Barber"
          width={1920}
          height={1080}
          className="object-cover object-top w-full h-full"  
        />  
      </div>	
      <MainContainer>
        <h1 className="text-center text-5xl font-bold p-10">No solo cortamos pelo, creamos estilo</h1>
      </MainContainer>
      {/* <h1>Barber</h1>
      <Link href="/auth/login">Login</Link>
      <br />
      <Link href="/auth/register">Register</Link> */}
    </div>
  );
}
