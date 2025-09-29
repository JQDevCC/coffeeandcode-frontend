import RequireAuth from "@/components/require-auth";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="min-h-screen grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-zinc-200 bg-zinc-50">
          <div className="p-4">
            <h2 className="font-semibold text-lg">Admin</h2>
          </div>
          <nav className="px-4 pb-6 space-y-1 text-sm">
            <Link href="/admin/dashboard" className="block rounded-lg px-3 py-2 hover:bg-zinc-100">Dashboard</Link>
            <Link href="/admin/videos" className="block rounded-lg px-3 py-2 hover:bg-zinc-100">Videos (HOME_HERO)</Link>
            <Link href="/admin/services" className="block rounded-lg px-3 py-2 hover:bg-zinc-100">Servicios</Link>
            <Link href="/admin/leads" className="block rounded-lg px-3 py-2 hover:bg-zinc-100">Leads</Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="border-b border-zinc-200">
            <div className="container py-4">
              <h1 className="text-xl font-semibold">Panel de administración</h1>
            </div>
          </div>
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}