"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.enum(["PROJECT","MENTORING","OTHER"]).default("PROJECT"),
  message: z.string().min(5),
});

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/leads`, {
      method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify({ ...data, source: "contact" })
    });
    if (res.ok) { toast.success("¡Mensaje enviado!"); reset(); }
    else { toast.error("No se pudo enviar. Probá más tarde."); }
  };

  return (
    <div className="container py-12 max-w-xl">
  <h1 className="text-3xl font-bold mb-2">Contacto</h1>
  <p className="text-zinc-600 dark:text-zinc-300 mb-6">Contame tu necesidad y te respondo a la brevedad.</p>

  <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
    <div>
      <label className="label">Nombre</label>
      <input {...register("name")} className="input" placeholder="Tu nombre" />
      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
    </div>

    <div>
      <label className="label">Email</label>
      <input type="email" {...register("email")} className="input" placeholder="tu@email.com" />
      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
    </div>

    <div>
      <label className="label">Tipo</label>
      <select {...register("type")} className="input">
        <option value="PROJECT">Proyecto</option>
        <option value="MENTORING">Mentoría</option>
        <option value="OTHER">Otro</option>
      </select>
    </div>

    <div>
      <label className="label">Mensaje</label>
      <textarea rows={6} {...register("message")} className="input" placeholder="Contame en qué te puedo ayudar" />
      {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
    </div>

    <button disabled={isSubmitting} className="btn-primary w-full">
      {isSubmitting ? "Enviando..." : "Enviar"}
    </button>
  </form>
</div>
  );
}