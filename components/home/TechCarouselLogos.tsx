"use client";

type Logo = { name: string; src: string };

const LOGOS: Logo[] = [
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Spring Security / JWT", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Maven", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" },
  { name: "JUnit 5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  // ⬇️ Cambiamos a -original.svg para evitar 404
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

export default function TechCarouselLogos() {
  const loop = [...LOGOS, ...LOGOS]; // bucle infinito

  return (
    <section className="mt-3">
      <div className="home-shell">
        <div className="marquee py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="marquee-track">
            {loop.map((t, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur
                           whitespace-nowrap min-w-[150px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt={t.name} className="h-6 w-6 shrink-0" />
                <span className="text-sm text-zinc-200">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}