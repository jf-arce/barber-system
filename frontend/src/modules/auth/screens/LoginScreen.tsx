"use client";
import Link from "next/link";
import { useAuthStore } from "../auth.store";
import { Button } from "@/core/components/Button";
import { UserAuthenticated, UserLogin } from "@/modules/auth/auth.types";
import { AuthService } from "@/modules/auth/auth.service";
import { LoaderCircleIcon } from "@/core/components/Icons";
import { Input } from "@/core/components/Input";
import { toast } from "sonner";

export const LoginScreen = () => {
    const isLoading = useAuthStore(state => state.isLoading);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setUserAuthenticated = useAuthStore(
        (state) => state.setUserAuthenticated
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formDataObj = Object.fromEntries(formData.entries());

        setLoading(true);
        await AuthService.login(formDataObj as UserLogin)
            .then((res: UserAuthenticated) => {
                setUserAuthenticated(res);
                toast.success("Sesión iniciada correctamente.");
            })
            .catch((error: Error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="bg-white text-black rounded-md shadow-lg p-6">
            <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">
                Iniciar sesión
            </h1>

            <form method="POST" onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="ejemplo@mail.com"
                        className="mt-1"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        className="mt-1"
                        required
                    />
                </div>

                <div className="text-sm">
                    <Link href="/forgot-password" className="text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button
                    type="submit"
                >
                    {
                        isLoading && (<LoaderCircleIcon className="loader animate-spin animate-infinite" />)
                    }
                    Iniciar sesión
                </Button>
            </form>

            <div className="flex justify-center gap-2 mt-6">
                <p className="text-sm text-gray-600">
                    ¿No tenés cuenta?
                </p>
                <Link href="/auth/register" className="text-sm text-primary font-medium hover:underline">
                    Regístrate
                </Link>
            </div>
        </div>

    );
};
