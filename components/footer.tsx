export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-100 bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="container py-10 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} JQDev — Quiroga Jorge</p>
        <p>Java + React · Buenos Aires</p>
      </div>
    </footer>
  );
}