"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/modules/auth/pages/Login";
import { useAuthStore } from "@/modules/auth/auth.store";
import { UserAuthenticated, UserLogin } from "@/modules/auth/auth.types";
import { AuthService } from "@/modules/auth/auth.service";

export default function LoginPage() {
  const setError = useAuthStore((state) => state.setError);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setUserAuthenticated = useAuthStore(
    (state) => state.setUserAuthenticated
  );
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    setError("");
    setLoading(true);
    await AuthService.login(formDataObj as UserLogin)
      .then((res: UserAuthenticated) => {
        setUserAuthenticated(res);
        setError("");
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return <Login handleSubmit={handleSubmit} />;
}
