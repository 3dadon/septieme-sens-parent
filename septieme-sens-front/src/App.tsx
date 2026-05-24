import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { LockKeyhole, LogOut } from "lucide-react";
import { FloatingNav } from "./components/FloatingNav";
import { senses } from "./content/senses";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SensePage } from "./pages/SensePage";
import type { SupabaseArticleForm } from "./types/content";
import { slugify } from "./utils/slugify";

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

function AdminArticleForm() {
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

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setIsLoadingSession(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setIsLoadingSession(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoadingSession(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    if (!supabase) {
      setError(
        "Configuration Supabase absente : renseigne VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY puis redémarre Vite.",
      );
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Connexion en cours...");

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message || "Email ou mot de passe incorrect.");
        return;
      }

      if (!data.session) {
        setError("Connexion refusée : aucune session Supabase retournée.");
        return;
      }

      setSession(data.session);
      setPassword("");
      setStatusMessage("");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Erreur inconnue pendant la connexion admin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setEmail("");
    setPassword("");
    setError("");
    setStatusMessage("");
  }

  if (isLoadingSession) {
    return (
      <>
        <FloatingNav />
        <section className="flex min-h-screen items-center justify-center px-6 py-28 text-[0.68rem] uppercase tracking-[0.34em] text-gold">
          Accès privé
        </section>
      </>
    );
  }

  return (
    <>
      <FloatingNav />
      <section className="flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[34rem] border-y border-[#d8c7a9]/80 py-12"
        >
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold">
            <LockKeyhole className="h-4 w-4" strokeWidth={1.25} />
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
            Accès privé
          </p>
          <h1 className="mt-5 font-display text-[3.8rem] leading-none text-ink sm:text-[5rem]">
            Administration
          </h1>

          {session ? (
            <div className="mt-9">
              <p className="text-lg leading-8 text-[#5f5141]">
                Gestion des articles à venir.
              </p>
              <AdminArticleForm />
              <button
                type="button"
                onClick={handleLogout}
                className="mt-9 inline-flex h-12 items-center gap-3 rounded-full border border-gold/32 px-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#6d5430] transition duration-500 hover:border-ink/20 hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.3} />
                Déconnexion admin
              </button>
            </div>
          ) : (
            <form className="mt-9 space-y-6" onSubmit={handleLogin}>
              {!isSupabaseConfigured ? (
                <p className="text-sm leading-6 text-[#8a3b2f]">
                  Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans ton
                  fichier .env local.
                </p>
              ) : null}
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                  Email admin
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                  Mot de passe
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-3 h-14 w-full border border-[#d8c7a9]/85 bg-[#fffaf1]/65 px-4 text-base text-ink outline-none transition focus:border-gold"
                  autoComplete="current-password"
                  required
                />
              </label>
              {error ? (
                <p className="text-sm leading-6 text-[#8a3b2f]">{error}</p>
              ) : null}
              {statusMessage ? (
                <p className="text-sm leading-6 text-[#6d5f4c]">
                  {statusMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center rounded-full border border-gold/45 px-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? "Vérification" : "Entrer"}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </>
  );
}

function AppContent() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);

    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const segments = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (segments.length === 0) {
    return <HomePage />;
  }

  if (segments.length === 1 && segments[0] === "admin") {
    return <AdminPage />;
  }

  const currentSense = senses.find((sense) => sense.slug === segments[0]);

  if (!currentSense) {
    return <NotFoundPage />;
  }

  if (segments.length === 1) {
    return <SensePage sense={currentSense} />;
  }

  const currentArticle = currentSense.articles.find(
    (article) => article.slug === segments[1],
  );

  if (currentArticle) {
    return <ArticleDetailPage sense={currentSense} article={currentArticle} />;
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <AppContent />
    </main>
  );
}
