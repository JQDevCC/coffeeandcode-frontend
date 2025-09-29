export type ServiceCard = {
  id: number; slug: string; title: string; summary: string | null;
  coverUrl: string | null; priceFrom: number | null;
};

export type ServiceDetail = {
  id: number; slug: string; title: string; summary: string | null; content: string | null;
  priceFrom: number | null;
  media: { id: number; type: "IMAGE" | "VIDEO"; url: string; altText?: string | null; primary?: boolean; sortOrder: number }[];
};

export type SiteVideo = {
  id: number; slot: string; url: string; title?: string | null; description?: string | null;
  durationSec?: number | null; published: boolean; sortOrder: number;
};

export type PageResponse<T> = {
  content: T[]; totalElements: number; totalPages: number; number: number; size: number;
};

export type AdminSiteVideo = {
  id: number;
  slot: string;             // "HOME_HERO"
  type: "VIDEO";
  storageProvider: "LOCAL" | "EXTERNAL";
  url: string;
  title?: string | null;
  description?: string | null;
  durationSec?: number | null;
  published: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};