"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isLoggedIn, clearToken } from "@/lib/auth";
import { Menu, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setLogged(isLoggedIn()); setMounted(true); }, []);

  function handleLogout() {
    clearToken();
    setLogged(false);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:bg-zinc-950/70 dark:border-zinc-800">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight" style={{ fontSize: "1.425rem" }}>
          <span className="text-brand">JQD</span>ev
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/services" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Servicios</Link>
          <Link href="/contact" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Contacto</Link>
          <a href="/#sobre-mi" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Sobre mí</a>

          {mounted ? (
            !logged ? (
              <Link href="/auth/login" className="btn-outline">Ingresar</Link>
            ) : (
              <button onClick={handleLogout} className="btn-primary">Salir</button>
            )
          ) : <span className="h-9 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />}
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}><Menu /></button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="container py-3 flex flex-col gap-2 text-sm">
            <Link href="/services" onClick={()=>setOpen(false)}>Servicios</Link>
            <Link href="/contact" onClick={()=>setOpen(false)}>Contacto</Link>
            <a href="/#sobre-mi" onClick={()=>setOpen(false)}>Sobre mí</a>
            {mounted && !logged ? (
              <Link href="/auth/login" onClick={()=>setOpen(false)}>Ingresar</Link>
            ) : mounted && logged ? (
              <button onClick={() => { setOpen(false); handleLogout(); }}>Salir</button>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}