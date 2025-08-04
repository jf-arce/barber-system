"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/auth.store";
import { Bell, LogOut, Settings, Home } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export const ClientNavbar = () => {
    const userAuthenticated = useAuthStore((state) => state.userAuthenticated);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const [navbar, setNavbar] = useState(false);

    const scrollNavBar = () => {
        if (window.scrollY >= 20) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollNavBar);
        return () => {
            window.removeEventListener("scroll", scrollNavBar);
        };
    }, []);

    const handleLogout = async () => {
        logout();
        router.push("/");
    };


    // const getUserInitials = (name: string) => {
    //     return name
    //         .split(" ")
    //         .map((n) => n[0])
    //         .join("")
    //         .toUpperCase()
    // }

    return (
        <nav className={`p-4 ${navbar ? 'bg-background shadow-md' : 'bg-transparent'} transition-all duration-300`}>
            <div className="container mx-auto px-4 flex justify-between items-center">

            <div className="flex items-center space-x-4">
                <Link href="/" className="text-white text-lg font-bold">BarberLP</Link>
            </div>

            <div className="flex items-center space-x-7">
                                <button
                    onClick={() => router.push("/client/dashboard")}
                    className="ml-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                    title="Ir al dashboard"
                >
                    <Home className="h-5 w-5" />
                </button>
                <div className="text-gray-400 hover:text-[#d0c1a9] cursor-pointer">
                    <Bell className="h-5 w-5" />
                </div>
                <div className="text-gray-400 hover:text-[#d0c1a9] cursor-pointer">
                    <Settings className="h-5 w-5" />
                </div>
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">{userAuthenticated?.name}</p>
                    </div>
                    <div className="h-10 w-10 border-2 border-[#d0c1a9]/20 rounded-full">
                        <Image 
                            width={40} 
                            height={40} 
                            src="/images/barber1.webp" 
                            alt={userAuthenticated?.name || "User Avatar"} 
                            className="object-cover h-full w-full rounded-full"
                        />
                        {/* <div className="bg-[#d0c1a9] text-[#171717] font-semibold">
                        {getUserInitials(userAuthenticated?.name || "U")}
                        </div> */}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="ml-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                        title="Cerrar sesión"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>

            </div>
        </nav>
    );
};
