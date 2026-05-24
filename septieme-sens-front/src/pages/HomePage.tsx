import { motion } from "framer-motion";
import { FloatingNav } from "../components/FloatingNav";
import { LogoMark } from "../components/LogoMark";
import { RouteLink } from "../components/RouteLink";
import { senses } from "../content/senses";
import type { Sense } from "../types/content";

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

export function HomePage() {
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
