"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().min(2, "Usuario requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña mínima 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Cuenta creada. Ya podés iniciar sesión.");
      reset();
      window.location.href = "/login";
    } catch (e:any) {
      toast.error("No se pudo registrar");
      console.error(e);
    }
  };

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-2">Crear cuenta</h1>
      <p className="text-zinc-600 mb-6">Registrate para acceder a tu panel.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border p-6 shadow-card">
        <div>
          <label className="block text-sm mb-1">Usuario</label>
          <input {...register("username")} className="w-full border rounded-xl p-3" placeholder="tu_usuario" />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" {...register("email")} className="w-full border rounded-xl p-3" placeholder="tu@email"/>
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input type="password" {...register("password")} className="w-full border rounded-xl p-3" placeholder="••••••" />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting} className="w-full rounded-xl bg-violet-600 text-white px-5 py-3">
          {isSubmitting ? "Creando..." : "Crear cuenta"}
        </button>
      </form>

      <p className="text-sm text-zinc-600 mt-4">
        ¿Ya tenés cuenta? <Link href="/auth/login" className="text-violet-700 underline">Ingresar</Link>
      </p>
    </div>
  );
}