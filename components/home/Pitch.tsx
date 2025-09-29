import Link from "next/link";

export default function Pitch() {
  return (
    <section className="bg-ink-800">
        <div className="home-shell py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Te ayudo a construir tu web profesional.
            </h2>
            <p className="text-zinc-300 mt-2">
                Backend en Java/Spring + Frontend en React/Next. Entregas claras, escalables y a medida.
            </p>

            <a href="/contact" className="btn btn-primary bg-brand-500 hover:bg-brand-600 mt-4">
                Trabajemos juntos
            </a>
        </div>
    </section>
  );
}