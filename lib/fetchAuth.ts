"use client";

import { getToken, clearToken } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function join(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

export async function fetchAuth(path: string, init: RequestInit = {}) {
  const token = getToken();
  const url = join(BASE, path);

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": (init.headers as any)?.["Content-Type"] ?? "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  // si perdimos sesión, limpiamos y mandamos a /auth/login
  if (res.status === 401 || res.status === 403) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    throw new Error(`Auth error ${res.status}`);
  }

  return res;
}

export async function getAuthJSON<T>(path: string) {
  const res = await fetchAuth(path);
  if (!res.ok) throw new Error(await res.text().catch(() => "Error"));
  return res.json() as Promise<T>;
}

export async function postAuthJSON<T>(path: string, body: any) {
  const res = await fetchAuth(path, { method: "POST", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text().catch(() => "Error"));
  return res.json() as Promise<T>;
}

export async function putAuthJSON<T>(path: string, body: any) {
  const res = await fetchAuth(path, { method: "PUT", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text().catch(() => "Error"));
  return res.json() as Promise<T>;
}

export async function deleteAuth(path: string) {
  const res = await fetchAuth(path, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text().catch(() => "Error"));
  return true;
}