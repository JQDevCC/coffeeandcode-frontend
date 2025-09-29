export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bienvenido</h2>
        <p className="text-zinc-600">Desde aquí vas a poder gestionar tu portada (video), servicios y leads.</p>
      </div>

      <div className="card p-5">
        <div className="rounded-2xl border p-5">
          <h3 className="font-medium">Video portada</h3>
          <p className="text-sm text-zinc-600">Gestioná el slot <code>HOME_HERO</code>.</p>
          <a href="/admin/videos" className="inline-block mt-3 rounded-xl bg-violet-600 text-white px-4 py-2">Ir a videos</a>
        </div>
        <div className="card p-5">
          <h3 className="font-medium">Servicios</h3>
          <p className="text-sm text-zinc-600">Cargá/edita tus servicios publicados.</p>
          <a href="/admin/services" className="inline-block mt-3 rounded-xl border px-4 py-2">Ir a servicios</a>
        </div>
        <div className="card p-5">
          <h3 className="font-medium">Leads</h3>
          <p className="text-sm text-zinc-600">Consultas recibidas desde Contacto.</p>
          <a href="/admin/leads" className="inline-block mt-3 rounded-xl border px-4 py-2">Ver leads</a>
        </div>
      </div>
    </div>
  );
}