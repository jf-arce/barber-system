"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  surname: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  genre: z.string().min(1, "Selecciona un género"),
  birthdate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/auth/login");
  };

  return (
    <div className="bg-white py-4 px-8 rounded-xl">
      <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">Regístrate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.name && <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="surname" className="text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.surname && <span className="text-sm text-red-500 mt-1">{errors.surname.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            {...register("email")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.email && <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.password && <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="phone"
            placeholder="+542213456674"
            {...register("phone")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.phone && <span className="text-sm text-red-500 mt-1">{errors.phone.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="genre" className="text-sm font-medium text-gray-700">Género</label>
          <select
            id="genre"
            defaultValue=""
            {...register("genre")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="" disabled>--seleccionar--</option>
            {["Hombre", "Mujer", "Otro"].map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <span className="text-sm text-red-500 mt-1">{errors.genre.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="birthdate" className="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            id="birthdate"
            {...register("birthdate")}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {errors.birthdate && <span className="text-sm text-red-500 mt-1">{errors.birthdate.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-primary text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80 transition duration-200 w-full"
        >
          Registrarse
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <span className="text-primary cursor-pointer hover:underline" onClick={() => router.push("/auth/login")}>
          Inicia sesión
        </span>
      </p>
    </div>
  );
}
