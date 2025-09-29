export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-200/70 dark:bg-zinc-800 rounded-md ${className}`} />;
}