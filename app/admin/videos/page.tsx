"use client";

import { useEffect, useState } from "react";
import { AdminSiteVideo } from "@/lib/types";
import { deleteAuth, getAuthJSON, postAuthJSON, putAuthJSON } from "@/lib/fetchAuth";
import { toast } from "sonner";

type FormState = {
  id?: number | null;
  url: string;
  title: string;
  description: string;
  published: boolean;
  storageProvider: "EXTERNAL" | "LOCAL";
  sortOrder: number;
};

const EMPTY: FormState = {
  id: null,
  url: "",
  title: "",
  description: "",
  published: false,
  storageProvider: "EXTERNAL",
  sortOrder: 0,
};

export default function AdminVideosPage() {
  const [items, setItems] = useState<AdminSiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  async function load() {
    setLoading(true);
    try {
      // ajusta si tu back usa otro query param; asumimos ?slot=HOME_HERO
      const data = await getAuthJSON<AdminSiteVideo[]>(`/public/site/videos?slot=HOME_HERO`);
      setItems(data);
    } catch (e:any) {
      console.error(e);
      toast.error("No se pudieron cargar los videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(v: AdminSiteVideo) {
    setForm({
      id: v.id,
      url: v.url,
      title: v.title || "",
      description: v.description || "",
      published: v.published,
      storageProvider: v.storageProvider,
      sortOrder: v.sortOrder ?? 0,
    });
    setShowForm(true);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const payload = {
        slot: "HOME_HERO",
        type: "VIDEO",
        storageProvider: form.storageProvider,
        url: form.url,
        title: form.title || null,
        description: form.description || null,
        published: form.published,
        sortOrder: form.sortOrder ?? 0,
      };

      if (form.id) {
        await putAuthJSON(`/api/site/videos/${form.id}`, payload);
        toast.success("Video actualizado");
      } else {
        await postAuthJSON(`/api/site/videos`, payload);
        toast.success("Video creado");
      }
      setShowForm(false);
      await load();
    } catch (e:any) {
      console.error(e);
      toast.error("Error guardando el video");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("¿Eliminar este video?")) return;
    try {
      await deleteAuth(`/api/site/videos/${id}`);
      toast.success("Video eliminado");
      await load();
    } catch (e:any) {
      console.error(e);
      toast.error("No se pudo eliminar");
    }
  }

  async function onTogglePublished(v: AdminSiteVideo) {
    try {
      await putAuthJSON(`/api/site/videos/${v.id}`, { ...v, published: !v.published });
      await load();
    } catch (e:any) {
      console.error(e);
      toast.error("No se pudo cambiar el estado");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Videos — Slot HOME_HERO</h2>
          <p className="text-sm text-zinc-600">Gestioná el video de portada de tu Home.</p>
        </div>
        <button onClick={openCreate} className="rounded-xl bg-violet-600 text-white px-4 py-2">
          Nuevo video
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border p-6">Cargando…</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border p-6 text-zinc-600">No hay videos cargados.</div>
      ) : (
        <div className="overflow-auto max-h-[60vh] card">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-left sticky top-0">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Publicado</th>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(v => (
                <tr key={v.id} className="border-t">
                  <td className="px-4 py-3">{v.id}</td>
                  <td className="px-4 py-3">{v.title || "-"}</td>
                  <td className="px-4 py-3">
                    <a href={v.url} target="_blank" className="text-violet-700 underline break-all">{v.url}</a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${v.published ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}>
                      {v.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{v.sortOrder ?? 0}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button onClick={() => openEdit(v)} className="rounded-lg border px-3 py-1.5">Editar</button>
                    <button onClick={() => onTogglePublished(v)} className="rounded-lg border px-3 py-1.5">
                      {v.published ? "Despublicar" : "Publicar"}
                    </button>
                    <button onClick={() => onDelete(v.id)} className="rounded-lg border px-3 py-1.5 text-red-600">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal simple inline */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">{form.id ? "Editar video" : "Nuevo video"}</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full border rounded-xl p-3" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Orden</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: Number(e.target.value)}))} className="w-full border rounded-xl p-3" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Descripción</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="w-full border rounded-xl p-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Proveedor</label>
                  <select value={form.storageProvider} onChange={e => setForm(f => ({...f, storageProvider: e.target.value as any}))} className="w-full border rounded-xl p-3">
                    <option value="EXTERNAL">EXTERNAL (URL)</option>
                    <option value="LOCAL" disabled>LOCAL (subida) — pronto</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({...f, published: e.target.checked}))} />
                    Publicado
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">URL del video</label>
                <input value={form.url} onChange={e => setForm(f => ({...f, url: e.target.value}))} className="w-full border rounded-xl p-3" placeholder="https://..." />
                <p className="text-xs text-zinc-500 mt-1">Para este MVP usaremos URL externa. La subida LOCAL la agregamos luego con multipart.</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2">Cancelar</button>
                <button className="rounded-xl bg-violet-600 text-white px-4 py-2">{form.id ? "Guardar" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}