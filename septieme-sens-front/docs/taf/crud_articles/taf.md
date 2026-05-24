Oui. Je ferais **4 tickets**, assez atomiques pour éviter le bazar, mais pas éclatés en 12 micro-tâches.

## 1. `[CONTENT][FRONT] Créer la couche articles Supabase`

```text
Objectif :
Créer une couche de lecture Supabase dédiée aux articles publics, sans modifier encore les pages.

Scope :
- Créer `src/types/content.ts`
- Créer `src/services/articleService.ts`
- Ajouter le type `PublishedArticle`
- Ajouter le mapping Supabase → modèle front
- Ajouter :
  - `getPublishedArticlesBySense(senseSlug)`
  - `getPublishedArticle(senseSlug, articleSlug)`

Contraintes :
- Ne pas modifier `App.tsx`
- Ne pas changer le design
- Ne pas supprimer le fallback statique
- Gérer proprement Supabase non configuré
- Build local obligatoire

Validation :
- `npm run build` OK
```

## 2. `[CONTENT][FRONT] Brancher les pages sensorielles sur les articles Supabase`

```text
Objectif :
Afficher les articles Supabase publiés sur chaque page sensorielle.

Scope :
- Modifier `SensePage`
- Charger les articles via `getPublishedArticlesBySense(sense.slug)`
- Afficher les articles Supabase si disponibles
- Garder les articles statiques en fallback si :
  - Supabase absent
  - erreur réseau
  - aucun article publié
- Ne pas casser le design actuel

Contraintes :
- Pas de refactor global de `App.tsx`
- Pas de React Query/Zustand
- Pas de changement de routing

Validation :
- Page `/odorat` affiche les articles Supabase publiés
- Fallback statique toujours fonctionnel
- `npm run build` OK
```

## 3. `[CONTENT][FRONT] Brancher les pages détail article sur Supabase`

```text
Objectif :
Afficher une page détail article depuis Supabase via `sense_slug + slug`.

Scope :
- Modifier la résolution de `/:senseSlug/:articleSlug`
- Charger l’article via `getPublishedArticle(senseSlug, articleSlug)`
- Afficher le contenu Supabase si trouvé
- Garder fallback statique si article introuvable ou Supabase indisponible

Contraintes :
- Ne pas modifier la DA
- Ne pas casser les articles statiques existants
- Prévoir un affichage propre du champ `content`

Validation :
- `/odorat/mon-article` fonctionne si article publié en base
- fallback statique OK
- article introuvable géré proprement
- `npm run build` OK
```

## 4. `[DEPLOY][VERCEL] Ajouter le rewrite SPA pour les URLs profondes`

```text
Objectif :
Permettre l’accès direct aux routes profondes Vite/React sur Vercel.

Scope :
- Ajouter `vercel.json` si nécessaire
- Configurer le rewrite SPA :
  source `/(.*)`
  destination `/`

Contraintes :
- Ne pas toucher au code applicatif
- Ne pas modifier la config Supabase
- Ne pas changer le routing maison

Validation :
- accès direct à `/odorat`
- accès direct à `/odorat/mon-article`
- refresh navigateur OK
- build Vercel OK
```

Ordre recommandé : **1 → 2 → 3 → 4**.
Le ticket 4 peut attendre juste après le premier déploiement dynamique.
