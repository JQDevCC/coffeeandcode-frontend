import { getJSON } from "@/lib/api";
import { PageResponse, ServiceCard } from "@/lib/types";

export default async function ServicesPage() {
  const page = await getJSON<PageResponse<ServiceCard>>("/public/services?page=0&size=12");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Servicios</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {page.content.map(s => (
          <a key={s.id} href={`/services/${s.slug}`} className="group card overflow-hidden hover:shadow-lg transition">
            {s.coverUrl ? (
                    <img src={s.coverUrl} alt={s.title} className="h-44 w-full object-cover group-hover:scale-[1.01] transition" />
                ) : (
                    <div className="h-44 w-full bg-zinc-100 dark:bg-zinc-800" />
                )}
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    {s.summary && <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">{s.summary}</p>}
                </div>
            </a>
        ))}
      </div>
    </div>
  );
}