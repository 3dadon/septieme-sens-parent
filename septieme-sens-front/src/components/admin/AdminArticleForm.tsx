import { useState, type FormEvent } from "react";
import { senses } from "../../content/senses";
import { supabase } from "../../lib/supabase";
import type { SupabaseArticleForm } from "../../types/content";
import { slugify } from "../../utils/slugify";

function createEmptyArticleForm(): SupabaseArticleForm {
  return {
    senseSlug: "gout",
    title: "",
    slug: "",
    category: "",
    description: "",
    content: "",
    imageUrl: "",
    published: false,
  };
}

export function AdminArticleForm() {
  const [form, setForm] = useState<SupabaseArticleForm>(() =>
    createEmptyArticleForm(),
  );
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  function updateForm<Field extends keyof SupabaseArticleForm>(
    field: Field,
    value: SupabaseArticleForm[Field],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCreateArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateError("");
    setCreateSuccess("");

    const slug = form.slug.trim() || slugify(form.title);
    const title = form.title.trim();
    const senseSlug = form.senseSlug.trim();

    if (!title || !senseSlug || !slug) {
      setCreateError("Renseigne au minimum un sens, un titre et un slug.");
      return;
    }

    if (!supabase) {
      setCreateError(
        "Configuration Supabase absente : renseigne VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY puis redémarre Vite.",
      );
      return;
    }

    setIsCreating(true);

    const { error } = await supabase.from("articles").insert({
      sense_slug: senseSlug,
      title,
      slug,
      category: form.category.trim() || null,
      description: form.description.trim() || null,
      content: form.content.trim() || null,
      image_url: form.imageUrl.trim() || null,
      published: form.published,
    });

    setIsCreating(false);

    if (error) {
      setCreateError(error.message);
      return;
    }

    setCreateSuccess("Article créé dans Supabase.");
    setForm(createEmptyArticleForm());
  }

  return (
    <form
      className="mt-12 space-y-7 border-t border-[#d8c7a9]/80 pt-10"
      onSubmit={handleCreateArticle}
    >
      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
          Créer un article
        </p>
        <p className="mt-3 text-sm leading-7 text-[#665746]">
          Première version simple : création en base, sans upload ni édition
          riche.
        </p>
      </div>

      <label className="block">
        <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
          Sens
        </span>
        <select
          value={form.senseSlug}
          onChange={(event) => updateForm("senseSlug", event.target.value)}
          className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
        >
          {senses.map((sense) => (
            <option key={sense.slug} value={sense.slug}>
              {sense.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
            Titre
          </span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
            required
          />
        </label>

        <label className="block">
          <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
            Slug
          </span>
          <input
            type="text"
            value={form.slug}
            onChange={(event) => updateForm("slug", event.target.value)}
            placeholder={form.title ? slugify(form.title) : "zeste-de-sicile"}
            className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition placeholder:text-[#9b8d79] focus:border-gold"
          />
          <span className="mt-2 block text-xs leading-5 text-[#7b6b58]">
            Si vide, il sera généré depuis le titre.
          </span>
        </label>
      </div>

      <label className="block">
        <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
          Catégorie
        </span>
        <input
          type="text"
          value={form.category}
          onChange={(event) => updateForm("category", event.target.value)}
          className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
          Description
        </span>
        <textarea
          value={form.description}
          onChange={(event) => updateForm("description", event.target.value)}
          rows={3}
          className="mt-3 w-full resize-y border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
          Contenu
        </span>
        <textarea
          value={form.content}
          onChange={(event) => updateForm("content", event.target.value)}
          rows={5}
          className="mt-3 w-full resize-y border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
          Image URL
        </span>
        <input
          type="url"
          value={form.imageUrl}
          onChange={(event) => updateForm("imageUrl", event.target.value)}
          className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-[#5f5141]">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(event) => updateForm("published", event.target.checked)}
          className="h-4 w-4 accent-[#a47a32]"
        />
        Publier l'article
      </label>

      {createError ? (
        <p className="text-sm leading-6 text-[#8a3b2f]">{createError}</p>
      ) : null}
      {createSuccess ? (
        <p className="text-sm leading-6 text-[#4c6546]">{createSuccess}</p>
      ) : null}

      <button
        type="submit"
        disabled={isCreating}
        className="inline-flex h-12 items-center rounded-full border border-gold/45 px-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 disabled:cursor-wait disabled:opacity-60"
      >
        {isCreating ? "Création" : "Créer l'article"}
      </button>
    </form>
  );
}
