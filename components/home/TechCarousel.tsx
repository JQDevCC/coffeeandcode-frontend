"use client";
import { useState } from "react";

type Logo = { name: string; src: string };

const LOGOS: Logo[] = [
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Spring Security / JWT", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Maven", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" },
  { name: "JUnit 5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

export default function TechCarouselLogos() {
  const [open, setOpen] = useState(false);
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="mt-4">
      <div className="container max-w-5xl">
        {/* carrusel más bajito y con menos padding */}
        <div className="marquee py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="marquee-track">
            {loop.map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt={t.name} className="h-6 w-6" />
                <span className="text-xs text-zinc-200">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-3">
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-outline border-white/20 text-white hover:bg-white/10"
          >
            {open ? "Ver menos" : "Ver más detalles"}
          </button>
        </div>

        {open && (
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOGOS.map((t, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.src} alt={t.name} className="h-7 w-7" />
                  <h4 className="font-semibold text-white">{t.name}</h4>
                </div>
                <p className="text-sm text-zinc-300 mt-2">
                  Experiencia práctica en proyectos reales utilizando {t.name}.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}