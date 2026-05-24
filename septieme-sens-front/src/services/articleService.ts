import { supabase } from "../lib/supabase";
import type { Article } from "../types/content";

const ARTICLE_SELECT =
  "id,sense_slug,title,slug,category,description,content,image_url,published,created_at,updated_at";

type SupabaseArticleRow = {
  id: string;
  sense_slug: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  content: string | null;
  image_url: string | null;
  alt?: string | null;
  published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type PublishedArticle = Article & {
  id: string;
  senseSlug: string;
  content: string;
  imageUrl: string;
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ArticleServiceResult<T> = {
  data: T;
  error: string | null;
};

function emptyResult<T>(data: T, error: string): ArticleServiceResult<T> {
  return { data, error };
}

function mapSupabaseArticle(row: SupabaseArticleRow): PublishedArticle {
  const title = row.title ?? "";
  const imageUrl = row.image_url ?? "";

  return {
    id: row.id,
    senseSlug: row.sense_slug,
    slug: row.slug,
    title,
    category: row.category ?? "",
    description: row.description ?? "",
    content: row.content ?? "",
    image: imageUrl,
    imageUrl,
    alt: row.alt?.trim() || title,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function fetchPublishedArticlesBySense(
  senseSlug: string,
  withCreatedAtOrder: boolean,
) {
  let query = supabase
    ?.from("articles")
    .select(ARTICLE_SELECT)
    .eq("sense_slug", senseSlug)
    .eq("published", true);

  if (withCreatedAtOrder) {
    query = query?.order("created_at", { ascending: false });
  }

  return query;
}

function isMissingCreatedAtError(errorMessage: string) {
  return errorMessage.toLowerCase().includes("created_at");
}

export async function getPublishedArticlesBySense(
  senseSlug: string,
): Promise<ArticleServiceResult<PublishedArticle[]>> {
  const normalizedSenseSlug = senseSlug.trim();

  if (!normalizedSenseSlug) {
    return emptyResult([], "Le slug du sens est requis.");
  }

  if (!supabase) {
    return emptyResult([], "Supabase n'est pas configuré.");
  }

  try {
    const orderedResponse = await fetchPublishedArticlesBySense(
      normalizedSenseSlug,
      true,
    );

    if (orderedResponse?.error) {
      if (isMissingCreatedAtError(orderedResponse.error.message)) {
        const unorderedResponse = await fetchPublishedArticlesBySense(
          normalizedSenseSlug,
          false,
        );

        if (unorderedResponse?.error) {
          return emptyResult([], unorderedResponse.error.message);
        }

        return {
          data: (unorderedResponse?.data ?? []).map((row) =>
            mapSupabaseArticle(row as SupabaseArticleRow),
          ),
          error: null,
        };
      }

      return emptyResult([], orderedResponse.error.message);
    }

    return {
      data: (orderedResponse?.data ?? []).map((row) =>
        mapSupabaseArticle(row as SupabaseArticleRow),
      ),
      error: null,
    };
  } catch (error) {
    return emptyResult(
      [],
      error instanceof Error
        ? error.message
        : "Erreur inconnue pendant la lecture des articles.",
    );
  }
}

export async function getPublishedArticle(
  senseSlug: string,
  articleSlug: string,
): Promise<ArticleServiceResult<PublishedArticle | null>> {
  const normalizedSenseSlug = senseSlug.trim();
  const normalizedArticleSlug = articleSlug.trim();

  if (!normalizedSenseSlug || !normalizedArticleSlug) {
    return emptyResult(null, "Le slug du sens et le slug article sont requis.");
  }

  if (!supabase) {
    return emptyResult(null, "Supabase n'est pas configuré.");
  }

  try {
    const { data, error } = await supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("sense_slug", normalizedSenseSlug)
      .eq("slug", normalizedArticleSlug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      return emptyResult(null, error.message);
    }

    return {
      data: data ? mapSupabaseArticle(data as SupabaseArticleRow) : null,
      error: null,
    };
  } catch (error) {
    return emptyResult(
      null,
      error instanceof Error
        ? error.message
        : "Erreur inconnue pendant la lecture de l'article.",
    );
  }
}
