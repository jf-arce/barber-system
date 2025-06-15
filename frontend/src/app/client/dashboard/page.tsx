"use client";
import { useAuthStore } from "@/modules/auth/auth.store";
import { Loading } from "@/modules/main/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientDashboardPage() {
  const isAuthenticated = useAuthStore((state) => state.userAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <Loading />;
    
  return (
    <div>
      Client Dashboard 
      <Link href={"/"}>Home</Link> 
    </div>
  )
}
