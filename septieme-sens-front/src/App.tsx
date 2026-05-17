import { motion } from "framer-motion";
import {
  Brain,
  Compass,
  Ear,
  Eye,
  Flower2,
  Hand,
  Home,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import logoUrl from "../dist/assets/7eme_sens_logo.png";

const navItems = [
  { label: "Accueil", href: "#accueil", icon: Home },
  { label: "Voyages", href: "#voyages", icon: Compass },
  { label: "Vue", href: "#vue", icon: Eye },
  { label: "Ouïe", href: "#ouie", icon: Ear },
  { label: "Odorat", href: "#odorat", icon: Flower2 },
  { label: "Goût", href: "#gout", icon: Utensils },
  { label: "Toucher", href: "#toucher", icon: Hand },
  { label: "Esprit", href: "#esprit", icon: Brain },
];

const senses = [
  {
    id: "vue",
    title: "Vue",
    text: "La lumière pose une émotion avant les mots.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "ouie",
    title: "Ouïe",
    text: "Un son suffit parfois à rouvrir une saison.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "odorat",
    title: "Odorat",
    text: "Une trace invisible, et la mémoire devient paysage.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "gout",
    title: "Goût",
    text: "Le vivant se raconte dans une nuance brève.",
    image:
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "toucher",
    title: "Toucher",
    text: "La matière calme le regard et réveille la présence.",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "esprit",
    title: "Esprit",
    text: "L’intuition relie ce que les sens ont commencé.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1800&q=90",
  },
];

function FloatingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-1.5rem)] max-w-[34rem] items-center justify-between rounded-full border border-[#cbb992]/70 bg-cream/78 px-2 py-2 shadow-capsule backdrop-blur-2xl sm:top-6"
      aria-label="Navigation principale"
    >
      <a
        href="#accueil"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-ivory font-display text-sm tracking-[0.12em] text-gold"
        aria-label="Septième Sens - Accueil"
      >
        VII
      </a>

      <div className="flex min-w-0 flex-1 items-center justify-evenly gap-0.5">
        {navItems.slice(1).map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white/80 focus-visible:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
            aria-label={label}
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.35} />
            <span className="pointer-events-none absolute top-12 scale-95 rounded-full bg-ink px-3 py-1 text-[0.56rem] uppercase text-ivory opacity-0 shadow-xl transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function LogoMark() {
  return (
    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-gold/25 bg-ivory/70 p-3 shadow-[0_18px_70px_rgba(129,91,43,0.16)] lg:mx-0">
      <img
        src={logoUrl}
        alt="Logo Septième Sens"
        className="h-full w-full scale-[1.85] object-contain object-[50%_38%]"
      />
    </div>
  );
}

function Hero() {
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
          //src="https://plus.unsplash.com/premium_photo-1699738856234-1369f4ff8bcf?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1900&q=90"
          src="https://images.unsplash.com/photo-1676809414802-be260bca80e8?auto=format&fit=crop&w=1900&q=90"
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
          <h1 className="mt-5 font-display text-[3.55rem] leading-[0.92] tracking-normal text-ink sm:text-[4.7rem] lg:text-[4.75rem] xl:text-[5.15rem]">
            Explorer ce qui donne du goût à la vie.
          </h1>
          <p className="mx-auto mt-7 max-w-sm text-sm leading-7 text-[#655746] lg:mx-0">
            Une galerie poétique dédiée aux sensations, aux matières, aux images, aux sons et aux
            récits qui réveillent la présence.
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
    <section id="voyages" className="px-5 py-14 sm:px-8 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto grid max-w-6xl gap-9 border-y border-[#c7b99d]/55 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:py-16"
      >
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">Voyages</p>
          <h2 className="mt-4 font-display text-5xl leading-none tracking-normal text-ink sm:text-6xl">
            Six portes, une présence.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#675846] lg:justify-self-end">
          Images, sons, matières et récits composent des passages courts, calmes, presque tactiles.
          La V1 ouvre l’espace, sans bruit inutile.
        </p>
      </motion.div>
    </section>
  );
}

function SenseCard({
  sense,
  index,
}: {
  sense: (typeof senses)[number];
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      id={sense.id}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.78, ease: "easeOut" }}
      className="grid overflow-hidden border border-[#d7c7ab] bg-ivory/74 shadow-veil lg:min-h-[35rem] lg:grid-cols-2"
    >
      <div className={`relative min-h-[23rem] overflow-hidden lg:min-h-full ${isReversed ? "lg:order-2" : ""}`}>
        <img
          src={sense.image}
          alt={`Univers sensoriel ${sense.title}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/5" />
      </div>

      <div className="flex items-center px-7 py-12 sm:px-10 lg:px-16">
        <div className="max-w-sm">
          <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold">
            <Sparkles className="h-4 w-4" strokeWidth={1.25} />
          </div>
          <p className="text-[0.58rem] uppercase tracking-[0.34em] text-gold">
            Sens 0{index + 1}
          </p>
          <h3 className="mt-4 font-display text-5xl leading-none tracking-normal text-ink sm:text-6xl">
            {sense.title}
          </h3>
          <p className="mt-6 text-sm leading-7 text-[#665746]">{sense.text}</p>
          <a
            href={`#${sense.id}`}
            className="mt-9 inline-flex rounded-full border border-gold/45 px-6 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#4b3a25] transition hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
          >
            Entrer
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <FloatingNav />
      <Hero />
      <TravelIntro />
      <section className="space-y-6 px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        {senses.map((sense, index) => (
          <SenseCard key={sense.id} sense={sense} index={index} />
        ))}
      </section>
    </main>
  );
}
