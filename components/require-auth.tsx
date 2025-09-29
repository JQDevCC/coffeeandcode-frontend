"use client";

import { useEffect, useState } from "react";
import { isLoggedIn } from "@/lib/auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/auth/login";
    } else {
      setOk(true);
    }
  }, []);

  if (!ok) {
    // placeholder para evitar hydration mismatch
    return <div className="container py-10">Cargando…</div>;
  }
  return <>{children}</>;
}