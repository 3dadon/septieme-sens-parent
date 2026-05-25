import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { LockKeyhole, LogOut } from "lucide-react";
import { AdminArticleForm } from "../components/admin/AdminArticleForm";
import { FloatingNav } from "../components/FloatingNav";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  listArticlesForAdmin,
  togglePublished,
  type PublishedArticle,
} from "../services/articleService";

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articles, setArticles] = useState<PublishedArticle[]>([]);
  const [selectedArticle, setSelectedArticle] =
    useState<PublishedArticle | null>(null);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [articlesError, setArticlesError] = useState("");
  const [articlesMessage, setArticlesMessage] = useState("");

  async function loadArticles() {
    setIsLoadingArticles(true);
    setArticlesError("");

    const { data, error: listError } = await listArticlesForAdmin();

    setIsLoadingArticles(false);

    if (listError) {
      setArticlesError(listError);
      return;
    }

    setArticles(data);

    if (selectedArticle) {
      setSelectedArticle(
        data.find((article) => article.id === selectedArticle.id) ?? null,
      );
    }
  }

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

  useEffect(() => {
    if (session) {
      loadArticles();
    }
  }, [session]);

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
    setArticles([]);
    setSelectedArticle(null);
    setArticlesError("");
    setArticlesMessage("");
  }

  async function handleTogglePublished(article: PublishedArticle) {
    setArticlesError("");
    setArticlesMessage("");

    const nextPublished = !article.published;
    const { error: toggleError } = await togglePublished(
      article.id,
      nextPublished,
    );

    if (toggleError) {
      setArticlesError(toggleError);
      return;
    }

    setArticlesMessage(nextPublished ? "Article publié." : "Article dépublié.");
    await loadArticles();
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
          className="mx-auto w-full max-w-[54rem] border-y border-[#d8c7a9]/80 py-12"
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
                Gestion des articles.
              </p>

              <div className="mt-10 border-t border-[#d8c7a9]/80 pt-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
                      Articles
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#665746]">
                      Liste simple des contenus Supabase.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedArticle(null);
                      setArticlesMessage("");
                      setArticlesError("");
                    }}
                    className="inline-flex h-12 items-center rounded-full border border-gold/45 px-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
                  >
                    Nouvel article
                  </button>
                </div>

                {articlesError ? (
                  <p className="mt-5 text-sm leading-6 text-[#8a3b2f]">
                    {articlesError}
                  </p>
                ) : null}
                {articlesMessage ? (
                  <p className="mt-5 text-sm leading-6 text-[#4c6546]">
                    {articlesMessage}
                  </p>
                ) : null}

                <div className="mt-7 space-y-3">
                  {isLoadingArticles ? (
                    <p className="text-sm leading-6 text-[#6d5f4c]">
                      Chargement des articles...
                    </p>
                  ) : null}

                  {!isLoadingArticles && articles.length === 0 ? (
                    <p className="text-sm leading-6 text-[#6d5f4c]">
                      Aucun article Supabase pour le moment.
                    </p>
                  ) : null}

                  {articles.map((article) => (
                    <article
                      key={article.id}
                      className="border border-[#d8c7a9]/80 bg-[#fffaf1]/50 p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[0.58rem] uppercase tracking-[0.26em] text-gold">
                            {article.senseSlug} ·{" "}
                            {article.published ? "Publié" : "Brouillon"}
                          </p>
                          <h2 className="mt-2 font-display text-2xl leading-none text-ink">
                            {article.title}
                          </h2>
                          <p className="mt-2 text-xs leading-5 text-[#7b6b58]">
                            /{article.senseSlug}/{article.slug}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedArticle(article);
                              setArticlesMessage("");
                              setArticlesError("");
                            }}
                            className="inline-flex h-10 items-center rounded-full border border-[#d8c7a9]/85 px-4 text-[0.58rem] uppercase tracking-[0.2em] text-[#6d5430] transition hover:border-ink/20 hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
                          >
                            Éditer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTogglePublished(article)}
                            className="inline-flex h-10 items-center rounded-full border border-gold/45 px-4 text-[0.58rem] uppercase tracking-[0.2em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
                          >
                            {article.published ? "Dépublier" : "Publier"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <AdminArticleForm
                selectedArticle={selectedArticle}
                onSaved={loadArticles}
                onCancelEdit={() => setSelectedArticle(null)}
              />
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
