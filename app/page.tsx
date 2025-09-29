import { getJSON } from "@/lib/api";
import { PageResponse, ServiceCard, SiteVideo } from "@/lib/types";
import Hero from "@/components/home/Hero";
import TechCarouselLogos from "@/components/home/TechCarouselLogos";
import ServiceCards from "@/components/home/ServiceCards";
import Pitch from "@/components/home/Pitch";
import { SERVICE_COVER_BY_SLUG } from "@/lib/serviceCovers";

export const revalidate = 0;

export default async function HomePage() {
  const [videos, services] = await Promise.all([
    getJSON<SiteVideo[]>("/public/site/videos?slot=HOME_HERO"),
    getJSON<PageResponse<ServiceCard>>("/public/services?page=0&size=6"),
  ]);
  const heroVideo = videos?.[0]?.url;

  // placeholders por si tu API trae pocos
  const items = [...services.content].map(s => ({
  ...s,
  coverUrl: s.coverUrl || SERVICE_COVER_BY_SLUG[s.slug] || "",
}));

const FALLBACK_COVERS = [
  "/images/services/desarrolloWeb.jpg",
  "/images/services/mentoria.jpg",
  "/images/services/cursos.jpg",
];

  // Si te quedaban placeholders, dales una imagen dummy para que pruebes layouts
 while (items.length < 3) {
  const idx = items.length; // 0,1,2...
  items.push({
    id: -idx - 1,
    slug: `placeholder-${idx}`,
    title: "Servicio de ejemplo",
    summary: "Descripción breve del servicio para completar el layout.",
    coverUrl: FALLBACK_COVERS[idx % FALLBACK_COVERS.length],
    priceFrom: undefined,
  } as any);
}

  return (
    <main className="site-bg min-h-screen text-white">

      <Hero videoUrl={heroVideo} />

      {/* Carrusel pegado al hero */}
      <TechCarouselLogos />

      

      {/* Servicios */}
      <ServiceCards items={items} />

      {/* CTA final (igual que tenías) */}
      <section className="bg-ink-800">
        <div className="container py-12 text-center max-w-5xl">
          <h3 className="text-2xl font-bold">¿Listo para empezar?</h3>
          <p className="text-zinc-300 mt-2">Contame tu idea y armamos un plan a medida.</p>
          <a href="/contact" className="btn btn-primary bg-brand-500 hover:bg-brand-600 mt-4">
            Trabajemos juntos
          </a>
        </div>
      </section>
    </main>
  );
}