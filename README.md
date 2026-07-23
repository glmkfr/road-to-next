# Apprentissage TypeScript — parcours full-stack

Dépôt d'apprentissage personnel. Il documente ma montée en compétences d'un profil développeur PHP/PrestaShop vers la stack JavaScript moderne : **TypeScript → React → Next.js → Node**, avec pour cible l'écosystème e-commerce headless (Medusa.js).

## La démarche

Ce n'est pas une collection de tutoriels recopiés. Le parcours suit une règle stricte :

- L'IA sert de **mentor** : elle structure le programme, explique les concepts, corrige les exercices et pose des questions ouvertes.
- Elle **n'écrit aucun code à ma place** et ne donne jamais de solution directe.
- Tout le code est écrit à la main, toute la documentation est rédigée par moi-même.

Chaque concept suit la même boucle : apprentissage → interaction → exercice pratique combinant l'acquis → correction → rédaction dans le journal.

## Organisation du dépôt

```
src/            Exercices et évaluations, par phase
docs/journal.md Journal d'apprentissage : concepts compris, erreurs
                rencontrées (cause → solution), décisions techniques
dist/           Sortie de compilation (non versionnée)
```

## Progression

| Phase | Contenu | Statut |
|---|---|---|
| 0 | Fondations & outillage (Node, npm, tsconfig, Git) | ✅ Terminée |
| 1 | JavaScript moderne + TypeScript (types, fonctions, méthodes de tableau, asynchrone, gestion d'erreurs) | ✅ Terminée |
| 2+ | React, Next.js, backend Node… | 🔜 À venir |

Le détail de chaque phase (concepts, pièges, décisions) est dans le [journal](docs/journal.md).

## Lancer le projet

Prérequis : Node.js 24 LTS (géré via nvm).

```bash
npm install
npm run dev    # exécute src/index.ts en mode watch (tsx)
npm run build  # compile vers dist/ (tsc, mode strict)
```

## Choix techniques

- **TypeScript en mode `strict`** dès le départ : les erreurs de typage font partie de l'apprentissage.
- **Outils installés en local** (devDependencies), jamais en global : chaque projet embarque ses versions.
- **Conventional Commits** pour l'historique Git.

---

*Dépôt à but pédagogique — le code reflète un niveau en progression, c'est le principe.*
