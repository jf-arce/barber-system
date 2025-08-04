"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { AuthService } from "../auth.service";
import { useState } from "react";
import { Button } from "@/core/components/Button";
import Link from "next/link";

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
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (userData: FormData) => {
    setError("");
    await AuthService.register(userData)
      .then(() => {
        alert("Usuario registrado con éxito");
        router.push("/auth/login");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white py-4 px-8 rounded-md">
      <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">Regístrate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          id="name"
          label="Nombre *"
          type="text"
          {...register("name")}
          error={errors.name}
        />
        <InputField
          id="surname"
          label="Apellido *"
          type="text"
          {...register("surname")}
          error={errors.surname}
        />
        <InputField
          id="email"
          label="Email *"
          type="email"
          placeholder="example@mail.com"
          {...register("email")}
          error={errors.email}
        />
        <InputField
          id="password"
          label="Contraseña *"
          type="password"
          placeholder="********"
          {...register("password")}
          error={errors.password}
        />
        <InputField
          id="phone"
          label="Teléfono (opcional)"
          type="tel"
          placeholder="+542213456674"
          {...register("phone")}
          error={errors.phone}
        />
        <SelectField
          id="gender"
          label="Género *"
          options={["Hombre", "Mujer", "Otro"]}
          {...register("gender")}
          error={errors.gender}
        />
        <div className="col-span-1 md:col-span-2">
          <InputField
            id="birthdate"
            label="Fecha de nacimiento *"
            type="date"
            {...register("birthdate")}
            error={errors.birthdate}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="col-span-1 md:col-span-2">
          <Button
            type="submit"
            loading={loading}
          >
            Registrarse
          </Button>
        </div>
      </form>

      <div className="flex justify-center gap-2 mt-6">
        <p className="text-sm text-gray-600">¿Ya tienes una cuenta?</p>
        <Link href="/auth/login" className="text-sm text-primary font-medium hover:underline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
