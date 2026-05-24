import { motion } from "framer-motion";
import type { Article } from "../types/content";
import { RouteLink } from "./RouteLink";

export function ArticleCard({
  article,
  index,
  senseSlug,
}: {
  article: Article;
  index: number;
  senseSlug: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{
        duration: 0.78,
        delay: Math.min(index * 0.045, 0.22),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group overflow-hidden rounded-[0.42rem] border border-[#d9c9af]/80 bg-[#fffaf1]/54 shadow-[0_18px_70px_rgba(67,48,29,0.08)] transition duration-700 hover:-translate-y-1 hover:bg-[#fffaf1]/78 hover:shadow-[0_30px_95px_rgba(67,48,29,0.13)]"
    >
      <RouteLink
        href={`/${senseSlug}/${article.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
      >
        <div className="relative aspect-[1.2/1] overflow-hidden bg-sand/25 sm:aspect-[1.45/1] lg:aspect-[1.38/1]">
          <img
            src={article.image}
            alt={article.alt}
            loading={index < 4 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-ink/[0.02] transition duration-700 group-hover:bg-transparent" />
        </div>
        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <h2 className="font-display text-[1.65rem] leading-none text-ink sm:text-[1.55rem] lg:text-[1.5rem] xl:text-[1.7rem]">
            {article.title}
          </h2>
          <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-gold">
            {article.category}
          </p>
        </div>
      </RouteLink>
    </motion.article>
  );
}
