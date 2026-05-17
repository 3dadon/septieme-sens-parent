# Septième Sens — Backend

## Rôle du backend

Le backend servira progressivement à supporter :

- contenus éditoriaux
- voyages sensoriels
- univers des sens
- profils sensoriels
- recommandations IA
- personnalisation
- formulaires / inscriptions
- future synchronisation mobile

La V1 peut rester sans backend si le frontend statique suffit.

## Stack recommandée

- Java 21
- Spring Boot 3
- Maven
- PostgreSQL
- JPA / Hibernate
- API REST simple

## Philosophie backend

Priorités :

1. API simple
2. modèle clair
3. endpoints lisibles
4. sécurité progressive
5. évolution sans sur-ingénierie

Éviter :

- architecture enterprise inutile
- relations JPA trop complexes
- logique métier dispersée
- endpoints ambigus
- dépendances inutiles

## Architecture attendue

Respecter une séparation simple :

- controller
- service
- repository
- entity
- dto si utile

Les controllers doivent rester fins.
La logique métier doit rester dans les services.

## Domaines probables

Modèles possibles à moyen terme :

- SensoryUniverse
- SensoryJourney
- Article
- MediaAsset
- AiPrompt
- SensoryProfile
- Recommendation

Ne créer ces modèles que lorsqu’ils sont nécessaires.

## API REST

Les routes doivent être explicites, par exemple :

- GET /api/journeys
- GET /api/journeys/{slug}
- GET /api/universes
- POST /api/ai/sensory-profile

Ne pas casser les contrats frontend sans validation.

## IA

L’IA doit servir l’expérience :

- découverte sensorielle
- personnalisation
- suggestions poétiques
- profils de goût
- recommandations

Elle ne doit pas remplacer la direction artistique.

Toujours prévoir :

- fallback propre
- timeout raisonnable
- logs utiles
- réponse JSON simple

## Base de données

- PostgreSQL local.
- Modèles simples et évolutifs.
- Pas de secrets hardcodés.
- Variables d’environnement si nécessaire.
- Migrations lisibles si Flyway/Liquibase est ajouté.

## Qualité

- Logs utiles mais non verbeux.
- Gestion d’erreurs claire.
- Validation des entrées utilisateur.
- Tests utiles sur services critiques.
- Build Maven vérifié après modification significative.

## Contraintes agents IA

- Ne pas créer de backend si la demande concerne uniquement la V1 front statique.
- Ne pas ajouter sécurité/auth sans demande.
- Ne pas créer de modèle de données massif prématuré.
- Ne modifier que les fichiers nécessaires.
- Stopper si fichier locké ou environnement instable.
- Expliquer les fichiers modifiés et les commandes lancées.
