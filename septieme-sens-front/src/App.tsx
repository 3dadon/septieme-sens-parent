import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Compass,
  Ear,
  Eye,
  Flower2,
  Hand,
  Home,
  Sparkles,
  Utensils,
} from "lucide-react";

type Article = {
  title: string;
  category: string;
  image: string;
  alt: string;
};

type Sense = {
  id: string;
  slug: string;
  label: string;
  senseNumber: string;
  intro: string;
  homeText: string;
  homeImage: string;
  icon: typeof Eye;
  articles: Article[];
};

const articleImages = [
  "/images/articles/artichaut-poivrade.jpg",
  "/images/articles/zeste-sicile.jpg",
  "/images/articles/huile-olive.jpg",
  "/images/articles/epices-monde.jpg",
  "/images/articles/poire-conference.jpg",
  "/images/articles/chocolat-noir.jpg",
  "/images/articles/pain-levain.jpg",
  "/images/articles/the-sencha.jpg",
];

const goutArticles: Article[] = [
  {
    title: "L'artichaut poivrade",
    category: "Nouveauté",
    image: articleImages[0],
    alt: "Artichaut poivrade dans une lumière chaude",
  },
  {
    title: "Le zeste de Sicile",
    category: "Intemporel",
    image: articleImages[1],
    alt: "Citron de Sicile suspendu à une branche",
  },
  {
    title: "Huile d'olive, l'or liquide",
    category: "Intemporel",
    image: articleImages[2],
    alt: "Huile d'olive dorée avec branches d'olivier",
  },
  {
    title: "Épices du monde",
    category: "Nouveauté",
    image: articleImages[3],
    alt: "Épices rouges sur une cuillère ancienne",
  },
  {
    title: "La poire conférence",
    category: "Intemporel",
    image: articleImages[4],
    alt: "Poires conférence posées dans une corbeille",
  },
  {
    title: "Chocolat noir 72%",
    category: "Nouveauté",
    image: articleImages[5],
    alt: "Morceaux de chocolat noir et poudre de cacao",
  },
  {
    title: "Pain au levain",
    category: "Intemporel",
    image: articleImages[6],
    alt: "Pain au levain ouvert sur un linge clair",
  },
  {
    title: "Thé vert Sencha",
    category: "Intemporel",
    image: articleImages[7],
    alt: "Thé vert fumant servi dans une théière",
  },
];

function makeArticles(titles: string[]): Article[] {
  return titles.map((title, index) => ({
    title,
    category: index % 3 === 0 ? "Nouveauté" : "Intemporel",
    image: articleImages[index % articleImages.length],
    alt: `${title}, composition éditoriale sensorielle`,
  }));
}

const senses: Sense[] = [
  {
    id: "vue",
    slug: "vue",
    label: "Vue",
    senseNumber: "01",
    intro: "Explorer la lumière, les formes et les images qui restent.",
    homeText: "La lumière pose une émotion avant les mots.",
    homeImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90",
    icon: Eye,
    articles: makeArticles([
      "La ligne d'horizon",
      "Blancs méditerranéens",
      "Ombres sur la pierre",
      "Le bleu après midi",
      "Fenêtres ouvertes",
      "La peau des murs",
      "Jardins silencieux",
      "L'éclat du verre",
    ]),
  },
  {
    id: "ouie",
    slug: "ouie",
    label: "Ouïe",
    senseNumber: "02",
    intro: "Explorer les sons discrets, les silences et les résonances.",
    homeText: "Un son suffit parfois à rouvrir une saison.",
    homeImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=90",
    icon: Ear,
    articles: makeArticles([
      "Le souffle du matin",
      "Une cloche au loin",
      "Vinyle et poussière",
      "Le silence des chambres",
      "Voix basses",
      "L'eau contre la pierre",
      "Notes de terrasse",
      "La mer en sourdine",
    ]),
  },
  {
    id: "odorat",
    slug: "odorat",
    label: "Odorat",
    senseNumber: "03",
    intro: "Explorer les traces invisibles et les mémoires parfumées.",
    homeText: "Une trace invisible, et la mémoire devient paysage.",
    homeImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=90",
    icon: Flower2,
    articles: makeArticles([
      "Figue chaude",
      "Linge au soleil",
      "Encens clair",
      "Basilic froissé",
      "La pluie sur la terre",
      "Bois blond",
      "Peau salée",
      "Rose ancienne",
    ]),
  },
  {
    id: "gout",
    slug: "gout",
    label: "Goût",
    senseNumber: "04",
    intro: "Explorer ce qui donne du goût à la vie.",
    homeText: "Le vivant se raconte dans une nuance brève.",
    homeImage: "/images/gout.avif",
    icon: Utensils,
    articles: goutArticles,
  },
  {
    id: "toucher",
    slug: "toucher",
    label: "Toucher",
    senseNumber: "05",
    intro: "Explorer les matières, les peaux et les textures calmes.",
    homeText: "La matière calme le regard et réveille la présence.",
    homeImage:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1800&q=90",
    icon: Hand,
    articles: makeArticles([
      "Lin froissé",
      "Marbre tiède",
      "Céramique mate",
      "La main sur le bois",
      "Coton épais",
      "Pierre polie",
      "Peau et lumière",
      "Le grain du papier",
    ]),
  },
  {
    id: "esprit",
    slug: "esprit",
    label: "Esprit",
    senseNumber: "06",
    intro: "Explorer l'intuition, les souvenirs et les liens invisibles.",
    homeText: "L'intuition relie ce que les sens ont commencé.",
    homeImage:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1800&q=90",
    icon: Brain,
    articles: makeArticles([
      "La mémoire des lieux",
      "Rituels minuscules",
      "Une idée claire",
      "Présences lentes",
      "Le rêve du dimanche",
      "Carnets ouverts",
      "L'intuition du geste",
      "Ce qui revient",
    ]),
  },
];

const articleFilters = ["Tous les articles", "Nouveautés", "Intemporels"];

function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0 });
}

function RouteLink({
  href,
  className,
  children,
  ariaLabel,
  ariaCurrent,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaCurrent?: "page";
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigateTo(href);
      }}
    >
      {children}
    </a>
  );
}

function FloatingNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex h-16 w-[calc(100%-1.5rem)] max-w-[28rem] items-center rounded-full border border-[#d8c7a9]/80 bg-[#fffaf1]/64 px-2 shadow-capsule backdrop-blur-2xl sm:top-7 sm:max-w-[34rem]"
      aria-label="Navigation des sens"
    >
      <RouteLink
        href="/"
        ariaLabel="Septième Sens - accueil"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#fff8eb]/80 font-display text-lg leading-none text-gold shadow-[0_10px_30px_rgba(164,122,50,0.13)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
      >
        VII
      </RouteLink>

      <div className="flex min-w-0 flex-1 items-center justify-evenly pl-2">
        {senses.map(({ label, slug, icon: Icon }) => {
          const active = slug === activeSlug;

          return (
            <RouteLink
              key={slug}
              href={`/${slug}`}
              ariaLabel={label}
              ariaCurrent={active ? "page" : undefined}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 ${
                active
                  ? "bg-[#485243] text-ivory shadow-[0_16px_42px_rgba(24,19,15,0.22)]"
                  : "text-ink/82 hover:bg-white/55"
              }`}
            >
              <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.25} />
              <span className="pointer-events-none absolute top-12 scale-95 rounded-full bg-ink px-3 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-ivory opacity-0 shadow-xl transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                {label}
              </span>
            </RouteLink>
          );
        })}
      </div>
    </motion.nav>
  );
}

function LogoMark() {
  return (
    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-gold/25 bg-ivory/70 p-3 shadow-[0_18px_70px_rgba(129,91,43,0.16)] lg:mx-0">
      <img
        src="/logo/7eme_sens_logo.png"
        alt="Logo Septième Sens"
        className="h-full w-full scale-[1.85] object-contain object-[50%_38%]"
      />
    </div>
  );
}

function HomeHero() {
  return (
    <section
      id="accueil"
      className="grid min-h-[94svh] grid-cols-1 pt-20 lg:grid-cols-[1.04fr_0.96fr] lg:pt-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative min-h-[66vh] overflow-hidden lg:min-h-[94svh]"
      >
        <img
          src="/images/gout.avif"
          alt="Matière claire, lumière chaude et composition éditoriale"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-cream/70 lg:bg-gradient-to-r lg:from-ink/16 lg:via-transparent lg:to-cream/35" />
        <div className="absolute bottom-6 left-5 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[0.58rem] uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md sm:left-8">
          Voyages sensoriels
        </div>
      </motion.div>

      <div className="flex min-h-[72vh] flex-col justify-between px-6 pb-10 pt-12 sm:px-10 lg:min-h-[94svh] lg:px-16 lg:pb-12 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="mx-auto max-w-[28rem] text-center lg:mx-0 lg:text-left"
        >
          <LogoMark />
          <p className="mt-10 text-[0.62rem] uppercase tracking-[0.42em] text-[#7b6b58]">
            Septième Sens
          </p>
          <h1 className="mt-5 font-display text-[3.55rem] leading-[0.92] text-ink sm:text-[4.7rem] lg:text-[4.75rem] xl:text-[5.15rem]">
            Explorer ce qui donne du goût à la vie.
          </h1>
          <p className="mx-auto mt-7 max-w-sm text-sm leading-7 text-[#655746] lg:mx-0">
            Une galerie poétique dédiée aux sensations, aux matières, aux images,
            aux sons et aux récits qui réveillent la présence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: "easeOut" }}
          className="mt-12 grid grid-cols-3 border-t border-[#c7b99d]/60 pt-6 text-[0.62rem] uppercase tracking-[0.2em] text-[#6d5f4c]"
        >
          <span>Beauté</span>
          <span className="text-center">Contemplation</span>
          <span className="text-right">Créativité</span>
        </motion.div>
      </div>
    </section>
  );
}

function TravelIntro() {
  return (
    <section id="sens" className="px-5 py-14 sm:px-8 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto grid max-w-6xl gap-9 border-y border-[#c7b99d]/55 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:py-16"
      >
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">
            Voyages
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
            Six portes, une présence.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#675846] lg:justify-self-end">
          Images, sons, matières et récits composent des passages courts,
          calmes, presque tactiles.
        </p>
      </motion.div>
    </section>
  );
}

function HomeSenseCard({ sense, index }: { sense: Sense; index: number }) {
  const isReversed = index % 2 === 1;
  const Icon = sense.icon;

  return (
    <motion.article
      id={sense.id}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.78, ease: "easeOut" }}
      className="grid overflow-hidden border border-[#d7c7ab] bg-ivory/74 shadow-veil lg:min-h-[35rem] lg:grid-cols-2"
    >
      <div
        className={`relative min-h-[23rem] overflow-hidden lg:min-h-full ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        <img
          src={sense.homeImage}
          alt={`Univers sensoriel ${sense.label}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/5" />
      </div>

      <div className="flex items-center px-7 py-12 sm:px-10 lg:px-16">
        <div className="max-w-sm">
          <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold">
            <Icon className="h-4 w-4" strokeWidth={1.25} />
          </div>
          <p className="text-[0.58rem] uppercase tracking-[0.34em] text-gold">
            Sens {sense.senseNumber}
          </p>
          <h3 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
            {sense.label}
          </h3>
          <p className="mt-6 text-sm leading-7 text-[#665746]">
            {sense.homeText}
          </p>
          <RouteLink
            href={`/${sense.slug}`}
            className="mt-9 inline-flex rounded-full border border-gold/45 px-6 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
          >
            Entrer
          </RouteLink>
        </div>
      </div>
    </motion.article>
  );
}

function HomePage() {
  return (
    <>
      <FloatingNav />
      <HomeHero />
      <TravelIntro />
      <section className="space-y-6 px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        {senses.map((sense, index) => (
          <HomeSenseCard key={sense.id} sense={sense} index={index} />
        ))}
      </section>
    </>
  );
}

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

function ArticleCard({ article, index }: { article: Article; index: number }) {
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
      <a
        href="#article"
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
      </a>
    </motion.article>
  );
}

function ArticlesGrid({ articles }: { articles: Article[] }) {
  return (
    <section
      id="articles"
      className="mx-auto grid max-w-[118rem] grid-cols-1 gap-5 px-5 pb-20 pt-5 sm:grid-cols-2 sm:px-10 sm:pb-24 md:gap-6 lg:grid-cols-4 lg:px-16 lg:pb-28"
    >
      {articles.map((article, index) => (
        <ArticleCard key={article.title} article={article} index={index} />
      ))}
    </section>
  );
}

function SensePage({ sense }: { sense: Sense }) {
  return (
    <>
      <FloatingNav activeSlug={sense.slug} />
      <SenseHero sense={sense} />
      <SecondaryNav />
      <ArticlesGrid articles={sense.articles} />
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

  const slug = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const currentSense = senses.find((sense) => sense.slug === slug);

  if (currentSense) {
    return <SensePage sense={currentSense} />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <AppContent />
    </main>
  );
}
