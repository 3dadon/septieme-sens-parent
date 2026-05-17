# Septième Sens — Mobile

## Rôle du mobile

Le mobile est une évolution future.

La priorité actuelle est un excellent site web mobile-first.
L’application mobile native ou Expo viendra seulement si l’usage le justifie.

## Stack recommandée future

- React Native
- Expo
- TypeScript
- API backend existante
- design system partagé si possible

## Objectif mobile

Transformer progressivement Septième Sens en expérience mobile :

- voyages sensoriels
- lecture immersive
- profils sensoriels
- favoris
- recommandations IA
- notifications éventuelles
- contenus audio/visuels

## Principe important

Ne pas créer d’app mobile prématurément.

Commencer par une base web propre qui pourra être adaptée sans coût excessif :

- composants simples
- logique UI claire
- contenus structurés
- routes cohérentes
- dépendances limitées
- design mobile-first

## UX mobile attendue

L’expérience doit être :

- fluide
- élégante
- contemplative
- tactile
- simple à parcourir
- adaptée aux usages issus des réseaux sociaux

Priorités :

- navigation au pouce
- cards lisibles
- grands visuels
- textes courts
- animations légères
- performances correctes

## Architecture future

Prévoir une structure simple :

- screens
- components
- services/api
- constants/theme
- hooks si nécessaire

Éviter :

- dépendances natives inutiles
- navigation complexe trop tôt
- permissions inutiles
- stockage local prématuré
- offline complexe en V1

## Backend

L’app mobile devra consommer le backend existant.

Ne pas casser les APIs web pour le mobile.
Prévoir éventuellement des endpoints adaptés au mobile seulement si nécessaire.

## Publication future

À préparer plus tard :

- Expo EAS
- APK test
- AAB Play Store
- variables d’environnement
- versioning Android
- politique de confidentialité si données utilisateur

## Contraintes agents IA

- Ne pas créer l’app mobile si la demande concerne seulement le web.
- Ne pas ajouter de dépendances natives sans justification.
- Toujours préserver une migration web → mobile simple.
- Proposer un plan minimal avant toute création mobile.
- Ne pas sur-ingénier une app qui n’a pas encore d’usage validé.
