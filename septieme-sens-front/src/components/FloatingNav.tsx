import { motion } from "framer-motion";
import { senses } from "../content/senses";
import { RouteLink } from "./RouteLink";

export function FloatingNav({ activeSlug }: { activeSlug?: string }) {
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
