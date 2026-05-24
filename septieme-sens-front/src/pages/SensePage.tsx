import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ArticlesGrid } from "../components/ArticlesGrid";
import { FloatingNav } from "../components/FloatingNav";
import { RouteLink } from "../components/RouteLink";
import { articleFilters } from "../content/staticArticles";
import {
  getPublishedArticlesBySense,
  type PublishedArticle,
} from "../services/articleService";
import type { Article, Sense } from "../types/content";

function SenseHero({ sense }: { sense: Sense }) {
  const Icon = sense.icon;

  return (
    <section
      id={sense.slug}
      className="mx-auto flex min-h-[31rem] w-full max-w-[118rem] flex-col justify-end px-5 pb-8 pt-28 sm:px-10 sm:pb-10 lg:min-h-[35rem] lg:px-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end"
      >
        <div>
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold sm:h-14 sm:w-14">
            <Icon className="h-4 w-4" strokeWidth={1.25} />
          </div>
          <p className="text-[0.64rem] uppercase tracking-[0.34em] text-gold">
            Sens {sense.senseNumber}
          </p>
          <h1 className="mt-5 font-display text-[4.7rem] leading-[0.86] text-ink sm:text-[6.4rem] lg:text-[7.8rem]">
            {sense.label}
          </h1>
          <p className="mt-7 max-w-[32rem] text-base leading-7 text-[#655746] sm:text-lg">
            {sense.intro}
          </p>
        </div>

        <RouteLink
          href="/"
          className="inline-flex h-12 w-fit items-center gap-3 rounded-full border border-gold/32 px-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#6d5430] transition duration-500 hover:border-ink/20 hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 sm:h-14 sm:px-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.3} />
          Retour aux sens
        </RouteLink>
      </motion.div>
    </section>
  );
}

function SecondaryNav() {
  return (
    <nav
      className="mx-auto max-w-[118rem] border-t border-[#d9c9af]/80 px-5 sm:px-10 lg:px-16"
      aria-label="Catégories d'articles"
    >
      <div className="flex gap-9 overflow-x-auto py-6 text-[0.64rem] uppercase tracking-[0.32em] text-[#7b6b58] [scrollbar-width:none] sm:gap-14">
        {articleFilters.map((filter, index) => (
          <a
            key={filter}
            href="#articles"
            className={`shrink-0 transition duration-500 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 ${
              index === 0 ? "text-gold" : ""
            }`}
          >
            {filter}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function SensePage({ sense }: { sense: Sense }) {
  const [publishedArticles, setPublishedArticles] = useState<
    PublishedArticle[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    setPublishedArticles([]);

    getPublishedArticlesBySense(sense.slug).then(({ data }) => {
      if (isMounted) {
        setPublishedArticles(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [sense.slug]);

  const articles: Article[] =
    publishedArticles.length > 0 ? publishedArticles : sense.articles;

  return (
    <>
      <FloatingNav activeSlug={sense.slug} />
      <SenseHero sense={sense} />
      <SecondaryNav />
      <ArticlesGrid articles={articles} senseSlug={sense.slug} />
    </>
  );
}
