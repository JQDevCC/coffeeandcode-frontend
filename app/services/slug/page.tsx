import { getJSON } from "@/lib/api";
import { ServiceDetail } from "@/lib/types";

type Props = { params: { slug: string } };

export default async function ServiceDetailPage({ params }: Props) {
  const data = await getJSON<ServiceDetail>(`/public/services/${params.slug}`);

  return (
    <div className="container py-10 max-w-4xl">
      {/* Título + resumen */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        {data.summary && <p className="text-zinc-600 dark:text-zinc-300">{data.summary}</p>}
      </header>

      {/* Galería (imágenes / videos) */}
      {data.media?.length ? (
        <section className="grid gap-4 md:grid-cols-2 mb-8">
          {data.media.map((m) => (
            <div key={m.id} className="card p-2">
              {m.type === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.url}
                  alt={m.altText || data.title}
                  className="rounded-xl w-full"
                />
              ) : (
                <video src={m.url} controls className="rounded-xl w-full" />
              )}
            </div>
          ))}
        </section>
      ) : null}

      {/* Contenido / descripción larga */}
      {data.content && (
        <article className="prose dark:prose-invert max-w-none mb-8">
          <p>{data.content}</p>
        </article>
      )}

      {/* CTA */}
      <div>
        <a href="/contact" className="btn btn-primary">Solicitar propuesta</a>
      </div>
    </div>
  );
}