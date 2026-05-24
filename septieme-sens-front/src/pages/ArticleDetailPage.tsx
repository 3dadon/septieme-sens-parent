import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FloatingNav } from "../components/FloatingNav";
import { RouteLink } from "../components/RouteLink";
import type { Article, Sense } from "../types/content";

export function ArticleDetailPage({
  sense,
  article,
}: {
  sense: Sense;
  article: Article;
}) {
  const Icon = sense.icon;

  return (
    <>
      <FloatingNav activeSlug={sense.slug} />
      <section className="grid min-h-screen pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[52svh] flex-col justify-center px-6 py-12 sm:px-10 lg:min-h-screen lg:px-16 xl:px-24"
        >
          <RouteLink
            href={`/${sense.slug}`}
            className="mb-12 inline-flex h-12 w-fit items-center gap-3 rounded-full border border-gold/32 px-5 text-[0.62rem] uppercase tracking-[0.24em] text-[#6d5430] transition duration-500 hover:border-ink/20 hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.3} />
            Retour aux articles
          </RouteLink>

          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold">
            <Icon className="h-4 w-4" strokeWidth={1.25} />
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
            {sense.label}
          </p>
          <h1 className="mt-6 max-w-[44rem] font-display text-[3.25rem] leading-[0.92] text-ink sm:text-[4.7rem] lg:text-[5.35rem]">
            {article.title}
          </h1>
          <div className="mt-8 h-px w-14 bg-gold" />
          <p className="mt-8 max-w-xl font-display text-2xl leading-9 text-[#2f261e] sm:text-3xl sm:leading-10">
            {article.description}
          </p>
          <p className="mt-8 max-w-lg text-sm leading-7 text-[#665746]">
            Une note courte dans la galerie Septième Sens, pensée comme une
            respiration visuelle et sensorielle.
          </p>
          <dl className="mt-12 grid gap-5 border-t border-[#d3c2a6]/75 pt-7 text-sm text-[#5f5141] sm:grid-cols-2">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                Catégorie
              </dt>
              <dd className="mt-2">{article.category}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                Univers
              </dt>
              <dd className="mt-2">{sense.label}</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[62svh] overflow-hidden lg:min-h-screen"
        >
          <img
            src={article.image}
            alt={article.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent lg:bg-ink/[0.04]" />
        </motion.div>
      </section>
    </>
  );
}
