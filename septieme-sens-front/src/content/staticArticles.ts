import type { Article } from "../types/content";
import { slugify } from "../utils/slugify";

export const articleImages = [
  "/images/articles/artichaut-poivrade.jpg",
  "/images/articles/zeste-sicile.jpg",
  "/images/articles/huile-olive.jpg",
  "/images/articles/epices-monde.jpg",
  "/images/articles/poire-conference.jpg",
  "/images/articles/chocolat-noir.jpg",
  "/images/articles/pain-levain.jpg",
  "/images/articles/the-sencha.jpg",
];

export const articleFilters = ["Tous les articles", "Nouveautés", "Intemporels"];

export function createArticle(
  title: string,
  category: string,
  image: string,
  alt: string,
  description = "Une sensation brève, précise, comme un souvenir qui revient dans la lumière.",
): Article {
  return {
    slug: slugify(title),
    title,
    category,
    description,
    image,
    alt,
  };
}

export const goutArticles: Article[] = [
  createArticle(
    "L'artichaut poivrade",
    "Nouveauté",
    articleImages[0],
    "Artichaut poivrade dans une lumière chaude",
    "Une amertume tendre, presque verte, qui ouvre l'appétit comme une promenade au marché.",
  ),
  createArticle(
    "Le zeste de Sicile",
    "Intemporel",
    articleImages[1],
    "Citron de Sicile suspendu à une branche",
    "Un parfum solaire, une fraîcheur vibrante, un souvenir d'enfance qui revient sans prévenir.",
  ),
  createArticle(
    "Huile d'olive, l'or liquide",
    "Intemporel",
    articleImages[2],
    "Huile d'olive dorée avec branches d'olivier",
    "Une matière dorée, lente et lumineuse, qui relie la table à la terre.",
  ),
  createArticle(
    "Épices du monde",
    "Nouveauté",
    articleImages[3],
    "Épices rouges sur une cuillère ancienne",
    "Quelques poudres chaudes suffisent à déplacer une assiette vers un autre paysage.",
  ),
  createArticle(
    "La poire conférence",
    "Intemporel",
    articleImages[4],
    "Poires conférence posées dans une corbeille",
    "Une douceur simple, juteuse, avec ce calme doré des fruits mûrs.",
  ),
  createArticle(
    "Chocolat noir 72%",
    "Nouveauté",
    articleImages[5],
    "Morceaux de chocolat noir et poudre de cacao",
    "Une profondeur mate, légèrement amère, qui reste longtemps sur la langue.",
  ),
  createArticle(
    "Pain au levain",
    "Intemporel",
    articleImages[6],
    "Pain au levain ouvert sur un linge clair",
    "Une croûte sonore, une mie vivante, la patience rendue visible.",
  ),
  createArticle(
    "Thé vert Sencha",
    "Intemporel",
    articleImages[7],
    "Thé vert fumant servi dans une théière",
    "Une vapeur claire, végétale, presque silencieuse.",
  ),
];

export function makeArticles(titles: string[]): Article[] {
  return titles.map((title, index) =>
    createArticle(
      title,
      index % 3 === 0 ? "Nouveauté" : "Intemporel",
      articleImages[index % articleImages.length],
      `${title}, composition éditoriale sensorielle`,
    ),
  );
}
