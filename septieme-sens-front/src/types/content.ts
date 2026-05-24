import type { LucideIcon } from "lucide-react";

export type Article = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export type Sense = {
  id: string;
  slug: string;
  label: string;
  senseNumber: string;
  intro: string;
  homeText: string;
  homeImage: string;
  icon: LucideIcon;
  articles: Article[];
};

export type SupabaseArticleForm = {
  senseSlug: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  imageUrl: string;
  published: boolean;
};
