import Image from "next/image";
import { ServiceCard } from "@/lib/types";

const FALLBACK_COVERS = [
  "/images/services/desarrolloWeb.jpg",
  "/images/services/mentoria.jpg",
  "/images/services/cursos.jpg",
];

export default function ServiceCards({ items }: { items: ServiceCard[] }) {
  return (
    <section id="servicios" className="bg-ink-900">
      <div className="home-shell pt-8 pb-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Servicios</h2>
          <a href="/services" className="text-sm text-brand-300 hover:text-brand-200">Ver todos</a>
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => {
            // Si coverUrl viene vacío, usamos un fallback distinto por índice
            const cover = s.coverUrl && s.coverUrl.trim().length > 0
              ? s.coverUrl
              : FALLBACK_COVERS[i % FALLBACK_COVERS.length];

            return (
              <a
                key={s.id ?? `${s.slug}-${i}`}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur hover:bg-white/[0.07] hover:border-white/15 transition shadow-soft overflow-hidden"
              >
                {/* Imagen superior con altura fija y cover */}
                <div className="relative w-full h-44 md:h-48">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                      priority={false}
                      // Si es URL remota no permitida aún, Next la bloquea → ver paso 3
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.06]" />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold">{s.title}</h3>
                  {s.summary && (
                    <p className="text-sm text-zinc-300 mt-1 line-clamp-2">
                      {s.summary}
                    </p>
                  )}
                  {s.priceFrom != null && (
                    <div className="mt-3 text-sm text-zinc-400">
                      Desde {s.priceFrom} ARS
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}