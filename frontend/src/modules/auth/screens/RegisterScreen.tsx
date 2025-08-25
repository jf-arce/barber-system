"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "../auth.service";
import { Button } from "@/core/components/Button";
import { LoaderCircleIcon } from "@/core/components/Icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/Form";
import { Input } from "@/core/components/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/core/components/Select";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  surname: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z.string().optional(),
  gender: z.string().min(1, "Selecciona un género"),
  birthdate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
});

type FormData = z.infer<typeof schema>;

export const RegisterScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      birthdate: "",
    }
  });

  const onSubmit = async (userData: FormData) => {
    setLoading(true);
    await AuthService.register(userData)
      .then(() => {
        toast.success(
          <>
            Tu cuenta ha sido creada correctamente.<br />
            Por favor, inicia sesión.
          </>
        );
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white py-4 px-8 rounded-md">
      <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">Regístrate</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-8 items-start w-full">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Nombre *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Apellido *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Email *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Contraseña *</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Teléfono (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="+542213456674" />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) =>
              <FormItem>
                <FormLabel className="text-gray-700">Género *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--seleccionar--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Hombre", "Mujer", "Otro"].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />
          <div className="col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) =>
                <FormItem>
                  <FormLabel className="text-gray-700">Fecha de nacimiento *</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
            />
          </div>

          <Button
            type="submit"
            className="col-span-2"
          >
            {
              loading && (<LoaderCircleIcon className="loader animate-spin animate-infinite" />)
            }
            Registrarse
          </Button>
        </form>
      </Form>

      <div className="flex justify-center gap-2 mt-6">
        <p className="text-sm text-gray-600">¿Ya tienes una cuenta?</p>
        <Link href="/auth/login" className="text-sm text-primary font-medium hover:underline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}