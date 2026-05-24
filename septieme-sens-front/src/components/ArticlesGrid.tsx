import type { Article } from "../types/content";
import { ArticleCard } from "./ArticleCard";

export function ArticlesGrid({
  articles,
  senseSlug,
}: {
  articles: Article[];
  senseSlug: string;
}) {
  return (
    <section
      id="articles"
      className="mx-auto grid max-w-[118rem] grid-cols-1 gap-5 px-5 pb-20 pt-5 sm:grid-cols-2 sm:px-10 sm:pb-24 md:gap-6 lg:grid-cols-4 lg:px-16 lg:pb-28"
    >
      {articles.map((article, index) => (
        <ArticleCard
          key={article.slug}
          article={article}
          index={index}
          senseSlug={senseSlug}
        />
      ))}
    </section>
  );
}
