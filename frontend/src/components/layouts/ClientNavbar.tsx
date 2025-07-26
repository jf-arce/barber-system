"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/auth.store";
import { LogOut } from "lucide-react";
import { Button } from "../Button";
import { useEffect, useState } from "react";

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

    return (
        <nav
            className={`p-4 ${
                navbar ? "bg-background shadow-md" : "bg-transparent"
            } transition-all duration-300`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/client/dashboard"
                        className="text-2xl font-bold tracking-wide"
                    >
                        BarberLP
                    </Link>
                </div>
                {/* Menu */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/client/dashboard"
                        className="px-4 py-2 rounded-sm text-white font-medium hover:bg-primary/20 transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/client/appointments"
                        className="px-4 py-2 rounded-sm text-white font-medium hover:bg-primary/20 transition-colors"
                    >
                        Mis Turnos
                    </Link>
                    <Link
                        href="/client/profile"
                        className="px-4 py-2 rounded-sm text-white font-medium hover:bg-primary/20 transition-colors"
                    >
                        Mi Perfil
                    </Link>
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-sm text-white font-medium hover:bg-primary/20 transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-white font-semibold text-sm truncate max-w-[120px]">
                        {userAuthenticated?.name || "Cliente"}
                    </span>

                    <Button onClick={handleLogout} className="!text-black">
                        <LogOut className="w-4 h-4" />
                        Salir
                    </Button>
                </div>
            </div>
        </nav>
    );
};
