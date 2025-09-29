const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function join(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function assertBase() {
  if (!RAW_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL no está definido. Creá .env.local con NEXT_PUBLIC_API_BASE_URL=http://localhost:8080 y reiniciá.");
  }
}

export async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  assertBase();
  const url = join(RAW_BASE, path);
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${url} -> ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function postJSON<T>(path: string, body: any, init?: RequestInit): Promise<T> {
  assertBase();
  const url = join(RAW_BASE, path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    body: JSON.stringify(body),
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${url} -> ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}