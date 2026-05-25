import { supabase } from "../lib/supabase";
import type { Article, SupabaseArticleForm } from "../types/content";

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

type ArticleMutationPayload = {
  sense_slug: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  content: string | null;
  image_url: string | null;
  published: boolean;
};

async function getAuthenticatedSession(actionName: string) {
  if (!supabase) {
    return {
      session: null,
      error: "Supabase n'est pas configuré.",
    };
  }

  const { data, error } = await supabase.auth.getSession();
  const session = data.session;

  console.info(`[articleService:${actionName}] session`, {
    hasSession: Boolean(session),
    userEmail: session?.user.email ?? null,
    userId: session?.user.id ?? null,
  });

  if (error) {
    console.error(`[articleService:${actionName}] session error`, error);
    return {
      session: null,
      error: error.message,
    };
  }

  if (!session?.user) {
    return {
      session: null,
      error: "Session admin absente : reconnecte-toi avant de modifier un article.",
    };
  }

  return {
    session,
    error: null,
  };
}

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

function mapArticleFormToPayload(
  form: SupabaseArticleForm,
  slug: string,
): ArticleMutationPayload {
  return {
    sense_slug: form.senseSlug.trim(),
    title: form.title.trim(),
    slug,
    category: form.category.trim() || null,
    description: form.description.trim() || null,
    content: form.content.trim() || null,
    image_url: form.imageUrl.trim() || null,
    published: form.published,
  };
}

function validateArticleForm(form: SupabaseArticleForm, slug: string) {
  const title = form.title.trim();
  const senseSlug = form.senseSlug.trim();

  if (!title || !senseSlug || !slug) {
    return "Renseigne au minimum un sens, un titre et un slug.";
  }

  return null;
}

export async function listArticlesForAdmin(): Promise<
  ArticleServiceResult<PublishedArticle[]>
> {
  const { error: sessionError } = await getAuthenticatedSession(
    "listArticlesForAdmin",
  );

  if (sessionError) {
    return emptyResult([], sessionError);
  }

  const client = supabase;

  if (!client) {
    return emptyResult([], "Supabase n'est pas configuré.");
  }

  try {
    const { data, error } = await client
      .from("articles")
      .select(ARTICLE_SELECT)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[articleService:listArticlesForAdmin] Supabase error", {
        error,
      });
      return emptyResult([], error.message);
    }

    return {
      data: (data ?? []).map((row) =>
        mapSupabaseArticle(row as SupabaseArticleRow),
      ),
      error: null,
    };
  } catch (error) {
    return emptyResult(
      [],
      error instanceof Error
        ? error.message
        : "Erreur inconnue pendant la lecture des articles admin.",
    );
  }
}

export async function createArticle(
  form: SupabaseArticleForm,
  slug: string,
): Promise<ArticleServiceResult<PublishedArticle | null>> {
  const validationError = validateArticleForm(form, slug);

  if (validationError) {
    return emptyResult(null, validationError);
  }

  const { error: sessionError } = await getAuthenticatedSession(
    "createArticle",
  );

  if (sessionError) {
    return emptyResult(null, sessionError);
  }

  const client = supabase;

  if (!client) {
    return emptyResult(null, "Supabase n'est pas configuré.");
  }

  try {
    const { data, error } = await client
      .from("articles")
      .insert(mapArticleFormToPayload(form, slug))
      .select(ARTICLE_SELECT)
      .single();

    if (error) {
      console.error("[articleService:createArticle] Supabase error", {
        payload: mapArticleFormToPayload(form, slug),
        error,
      });
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
        : "Erreur inconnue pendant la création de l'article.",
    );
  }
}

export async function updateArticle(
  articleId: string,
  form: SupabaseArticleForm,
  slug: string,
): Promise<ArticleServiceResult<PublishedArticle | null>> {
  const validationError = validateArticleForm(form, slug);

  if (validationError) {
    return emptyResult(null, validationError);
  }

  if (!articleId.trim()) {
    return emptyResult(null, "Identifiant article manquant.");
  }

  const { error: sessionError } = await getAuthenticatedSession(
    "updateArticle",
  );

  if (sessionError) {
    return emptyResult(null, sessionError);
  }

  const client = supabase;

  if (!client) {
    return emptyResult(null, "Supabase n'est pas configuré.");
  }

  try {
    const { data, error } = await client
      .from("articles")
      .update(mapArticleFormToPayload(form, slug))
      .eq("id", articleId)
      .select(ARTICLE_SELECT)
      .single();

    if (error) {
      console.error("[articleService:updateArticle] Supabase error", {
        articleId,
        payload: mapArticleFormToPayload(form, slug),
        error,
      });
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
        : "Erreur inconnue pendant la sauvegarde de l'article.",
    );
  }
}

export async function togglePublished(
  articleId: string,
  published: boolean,
): Promise<ArticleServiceResult<PublishedArticle | null>> {
  if (!articleId.trim()) {
    return emptyResult(null, "Identifiant article manquant.");
  }

  const { error: sessionError } = await getAuthenticatedSession(
    "togglePublished",
  );

  if (sessionError) {
    return emptyResult(null, sessionError);
  }

  console.info("[articleService:togglePublished] request", {
    articleId,
    published,
  });

  const client = supabase;

  if (!client) {
    return emptyResult(null, "Supabase n'est pas configuré.");
  }

  try {
    const { data, error } = await client
      .from("articles")
      .update({ published })
      .eq("id", articleId)
      .select(ARTICLE_SELECT)
      .single();

    if (error) {
      console.error("[articleService:togglePublished] Supabase error", {
        articleId,
        published,
        error,
      });
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
        : "Erreur inconnue pendant le changement de publication.",
    );
  }
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
