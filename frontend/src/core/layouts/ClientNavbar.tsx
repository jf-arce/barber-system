"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/auth.store";
import { Bell, LogOut, Settings, Home } from "lucide-react";
import Image from "next/image";

export const ClientNavbar = () => {
    const userAuthenticated = useAuthStore((state) => state.userAuthenticated);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async () => {
        logout();
        router.push("/");
    };

    const getUserInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <nav className={`p-4 bg-foreground fixed top-0 left-0 right-0 z-50 shadow-md transition-all duration-300`}>
            <div className="w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto flex justify-between items-center">

            <div className="flex items-center space-x-4">
                <Link href="/" className="text-white text-xl font-bold">BarberLP</Link>
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
                        <p className="text-md font-medium text-white">{userAuthenticated?.name}</p>
                    </div>
                    <div className="h-10 w-10 border-2 border-[#d0c1a9]/20 rounded-full">
                        {/* <Image 
                            width={40} 
                            height={40} 
                            src="/images/barber1.webp" 
                            alt={userAuthenticated?.name || "User Avatar"} 
                            className="object-cover h-full w-full rounded-full"
                        /> */}
                        <div className="flex items-center justify-center h-full w-full bg-[#d0c1a9] rounded-full">
                            <span className="text-foreground font-semibold text-lg select-none">
                                {getUserInitials(userAuthenticated?.name || "U")}
                            </span>
                        </div>
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
