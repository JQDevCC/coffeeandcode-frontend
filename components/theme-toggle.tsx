"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    setDark(isDark);
    // Persistencia simple (opcional)
    localStorage.setItem("cc_theme", isDark ? "dark" : "light");
  }

  useEffect(() => {
    // Aplica preferencia guardada al cargar
    const pref = localStorage.getItem("cc_theme");
    if (pref === "dark") document.documentElement.classList.add("dark");
  }, []);

  if (!mounted) return <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800" />;

  return (
    <button
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      {dark ? <Sun size={16}/> : <Moon size={16}/>}
    </button>
  );
}