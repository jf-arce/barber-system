"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/auth.store";

export default function AuthLoginProvider({ children }: { children: React.ReactNode }) {
    const userAuthenticated = useAuthStore((state) => state.userAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (userAuthenticated) {
            switch (userAuthenticated.role) {
                case "Admin":
                    router.push("/admin/dashboard");
                    break;
                case "User":
                    router.push("/client/dashboard");
                    break;
                case "Barber":
                    router.push("/barber/dashboard");
                    break;
            }
        }
    }, [userAuthenticated, router]);

    return (
        <>{children}</>
    )
}
