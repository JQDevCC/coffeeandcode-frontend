type Props = { videoUrl?: string };

export default function Hero({ videoUrl }: Props) {
  const sample = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

  return (
    <section className="relative overflow-hidden">
        {/* fondo degradado sutil */}
        <div className="absolute inset-0 home-hero-bg home-hero-grid -z-10" />

            <div className="home-shell pt-6 md:pt-8 pb-2 md:pb-3">  {/* ← antes: py-6 md:py-8 */}

                {/* grid 2 columnas en md+, centramos verticalmente para que no quede “hueco” bajo la leyenda */}
                <div className="grid gap-6 md:grid-cols-2 md:items-center">  {/* ← añadí md:items-center */}
                {/* Columna IZQUIERDA: leyenda */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                        Te ayudo a construir tu web profesional.
                    </h1>

                    <p className="text-zinc-300 mt-3">
                        Backend en Java/Spring + Frontend en React/Next. Entregas claras, escalables y a medida.
                    </p>

                    {/* Botón con margen relativo en % */}
                    <a
                        href="/contact"
                        className="mt-[7%] inline-flex items-center px-6 py-3 rounded-xl bg-brand-500 text-white text-lg font-semibold shadow hover:bg-brand-600 transition"
                    >
                        Trabajemos juntos
                    </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-soft">
                    {/* contenedor 16:9 */}
                    <div className="aspect-video w-full">
                        <video
                        src="/videos/20240622_214530.mp4"
                        className="w-full h-full object-contain bg-black"   // ⬅️ clave: object-contain
                        controls
                        preload="metadata"
                        playsInline
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}