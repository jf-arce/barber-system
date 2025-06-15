"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "../auth.store";
import { Loading } from "@/modules/main/components/Loading";

interface AuthRefreshProps {
    children: React.ReactNode;
}

export const AuthRefresh = ({ children }:AuthRefreshProps) => {

    const refreshToken = useAuthStore((state) => state.refreshToken);
    const [isLoading, setIsLoading]= useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await refreshToken();
            setIsLoading(false);
        }
        )();
    }, [refreshToken]);

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : 
                <>{children}</>
            }
        </>
    )
}