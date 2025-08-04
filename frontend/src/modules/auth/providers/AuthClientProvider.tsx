"use client";
import { useAuthStore } from "@/modules/auth/auth.store";
import { Loading } from "@/modules/main/components/Loading";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const AuthClientProvider = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.userAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return <Loading />;

    return <>{children}</>;
};
