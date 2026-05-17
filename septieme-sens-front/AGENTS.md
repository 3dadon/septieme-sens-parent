# Septième Sens — Frontend Web

## Rôle du frontend

Le frontend est le cœur de la V1.

Il doit porter l’expérience artistique, poétique et sensorielle de Septième Sens.

Objectif immédiat :

- créer une première page publique très belle
- mobile-first
- publiable rapidement
- fidèle à la DA Septième Sens

## Stack recommandée

- React ou Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react si besoin

## Direction artistique

Le site doit être :

- très aéré
- luxueux
- éditorial
- imagé
- fluide
- minimal en texte
- contemplatif
- mobile-first

Référence de layout :

- grandes images sur un côté
- très peu de texte sur l’autre
- navbar flottante centrale en capsule
- icônes + tooltip
- animations douces
- palette beige chaud / sable / or doux / noir profond

## Identité

Utiliser le logo Septième Sens si disponible.

Sinon, utiliser temporairement :

- monogramme `VII`
- approche élégante
- rappel discret des 6 sens
- feuille d’olivier si asset disponible

## Sections V1

Prévoir les sections :

- Accueil
- Voyages
- Vue
- Ouïe
- Odorat
- Goût
- Toucher
- Esprit

Phrase centrale :

> Explorer ce qui donne du goût à la vie.

Sous-texte possible :

> Une galerie poétique dédiée aux sensations, aux matières, aux images, aux sons et aux récits qui réveillent la présence.

## UX mobile-first

Le site sera probablement consulté depuis les réseaux sociaux.

Priorités :

- rendu mobile impeccable
- navigation simple au pouce
- textes courts
- images bien cadrées
- temps de chargement raisonnable
- animations légères
- responsive desktop secondaire mais propre

## Architecture frontend

- composants petits et lisibles
- données statiques isolées si possible
- composants UI réutilisables
- pas de state management complexe
- pas de logique métier lourde dans les composants
- structure compatible avec future adaptation mobile

## Performance

- Optimiser les images si possible.
- Éviter les dépendances lourdes.
- Éviter les animations coûteuses.
- Ne pas charger de librairie UI massive pour une V1.
- Préférer CSS/Tailwind simple.

## Accessibilité

- textes lisibles
- contrastes suffisants
- boutons clairs
- alt sur les images importantes
- navigation clavier correcte si possible

## Contraintes agents IA

- Ne pas transformer le projet en landing SaaS.
- Ne pas ajouter backend/auth.
- Ne pas casser la DA existante.
- Ne pas refactorer tout le projet sans demande.
- Ne modifier que les fichiers nécessaires.
- Garder le code simple, maintenable et publiable.
- Vérifier le démarrage/build uniquement si pertinent.
