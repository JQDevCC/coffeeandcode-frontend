import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

// ✅ IMPORTS QUE VOLVEMOS A PONER
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner"; // si usás el wrapper de shadcn, cambia a "@/components/ui/sonner"

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee&Code — Desarrollo web y mentorías",
  description: "Backends en Java + front-ends en React/Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={font.className + " bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100"}>
        {/* ⬇️ Navbar global */}
        <Navbar />

        {/* ⬇️ Contenido de cada página */}
        {children}

        {/* ⬇️ Footer global */}
        <Footer />

        {/* ⬇️ Toaster global (notificaciones) */}
        <Toaster richColors />
      </body>
    </html>
  );
}
