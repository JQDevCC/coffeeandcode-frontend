"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { saveToken } from "@/lib/auth";

const schema = z.object({
  username: z.string().min(2, "Usuario requerido"),
  password: z.string().min(4, "Contraseña requerida"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Login inválido");
      }
      const json = await res.json(); // asumes {token:"..."} o {accessToken:"..."}
      const token = json.token || json.accessToken || json.jwt || "";
      if (!token) throw new Error("No se recibió token");
      saveToken(token);
      toast.success("Bienvenido 😄");
      window.location.href = "/"; // redirige a home (o /admin más adelante)
    } catch (e:any) {
      toast.error("Credenciales inválidas");
      console.error(e);
    }
  };

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-2">Ingresar</h1>
      <p className="text-zinc-600 mb-6">Accedé a tu cuenta para administrar contenido.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border p-6 shadow-card">
        <div>
          <label className="block text-sm mb-1">Usuario</label>
          <input {...register("username")} className="w-full border rounded-xl p-3" placeholder="tu_usuario" />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input type="password" {...register("password")} className="w-full border rounded-xl p-3" placeholder="••••••" />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full rounded-xl bg-violet-600 text-white px-5 py-3">
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-sm text-zinc-600 mt-4">
        ¿No tenés cuenta? <Link href="/auth/register" className="text-violet-700 underline">Registrate</Link>
      </p>
    </div>
  );
}