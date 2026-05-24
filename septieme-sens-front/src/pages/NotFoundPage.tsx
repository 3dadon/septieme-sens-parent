import { FloatingNav } from "../components/FloatingNav";
import { RouteLink } from "../components/RouteLink";

export function NotFoundPage() {
  return (
    <>
      <FloatingNav />
      <section className="flex min-h-screen items-center px-6 pt-24 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
            Article introuvable
          </p>
          <h1 className="mt-5 font-display text-6xl leading-none text-ink">
            La page s'est égarée.
          </h1>
          <p className="mt-7 text-sm leading-7 text-[#665746]">
            Ce récit n'existe pas encore ou son adresse a changé.
          </p>
          <RouteLink
            href="/"
            className="mt-9 inline-flex rounded-full border border-gold/45 px-6 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
          >
            Retour à l'accueil
          </RouteLink>
        </div>
      </section>
    </>
  );
}
