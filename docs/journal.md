# Journal d'apprentissage — Reconversion full-stack

Suivi de ma progression : PHP/PrestaShop → Next.js + Node/TypeScript (cible : Medusa).

Ce journal est purement technique : pour chaque phase, ce que j'ai fait, les concepts
compris, les problèmes rencontrés (cause → solution) et les décisions prises.
La démarche générale est décrite dans le [README](../README.md).

---

## Phase 0 — Fondations & outillage

**Statut :** ✅ terminée · **Auto-évaluation :** autonome

### Ce que j'ai mis en place
- Node **24 LTS**, géré via **nvm** (permet de basculer entre versions selon les projets).
- **VS Code** relié au terminal (commande `code`).
- Projet **npm** initialisé (`npm init -y`) avec scripts `dev` / `build` / `test`.
- **TypeScript** + **tsx** installés *dans le projet* (devDependencies), pas en global.
- **tsconfig.json** : `strict: true`, `rootDir: ./src`, `outDir: ./dist`.
- Dépôt **Git** avec `.gitignore` (`node_modules`, `dist`) et commits *Conventional Commits*.

### Concepts clés compris
- **Section `scripts` de `package.json`** = carnet de raccourcis de commandes.
  `npm run <nom>` exécute la commande associée. Ça standardise le projet :
  n'importe qui clone le repo et sait comment le lancer.
- **Current vs LTS** (Node) : on développe/déploie sur la **LTS** (stable, maintenue
  longtemps) ; la « Current » sert à tester les nouveautés, jamais la prod.
- **Les outils vivent dans le projet** : `tsc`, `tsx`… sont dans `node_modules/.bin`.
  `npm run` et `npx` les y trouvent automatiquement → pas besoin d'installer en global,
  chaque projet a sa propre version.
- **Source vs artefact généré** : on versionne la *source* (`src/`, configs), jamais
  ce qui se *régénère* (`node_modules/`, `dist/`). Une commande suffit à les recréer.
- **Le lockfile est sacré** : `package-lock.json` fige les versions EXACTES →
  tout le monde installe la même chose → tue le « ça marche chez moi ».

### Problèmes rencontrés → cause → solution

- **Problème :** `zsh: command not found: code`
  **Cause :** la commande `code` n'était pas ajoutée au PATH.
  **Solution :** VS Code → `Cmd+Shift+P` → « Install 'code' command in PATH »,
  puis **ouvrir un nouveau terminal** (le PATH n'est relu qu'au démarrage).

- **Problème :** `tsc: command not found` quand je tape `tsc` seul, alors que
  `npm run build` arrive à lancer `tsc`.
  **Cause :** TypeScript est installé *localement* (dans `node_modules`), pas en
  global. Quand on le tape seul, le terminal cherche un `tsc` global → introuvable.
  **Solution / à retenir :** `npm run` et `npx` ajoutent `node_modules/.bin` au PATH
  le temps de la commande. Pour lancer un outil du projet à la main : `npx tsc`.

- **Problème :** `npm run build` affichait l'aide de `tsc` au lieu de compiler.
  **Cause :** aucun `tsconfig.json` dans le projet → `tsc` ne savait pas quoi faire.
  **Solution :** générer la config avec `npx tsc --init`, puis régler `rootDir`
  et `outDir`.

### Décisions techniques et pourquoi

- **Node 24 LTS** plutôt que 26 Current → stabilité, et c'est la cible de Medusa (Node 20+).
- **nvm** plutôt qu'une install « en dur » → je jongle entre projets (ex. vieux
  projets PHP en Node 12 et apprentissage en Node 24) sans conflit.
- **`.gitignore` incluant `dist/`** → c'est un artefact régénérable, pas de la source.

### Encore flou / à revoir
- Le détail des `.d.ts` et des source maps (`.js.map`) générés dans `dist/` :
  je sais à quoi ça sert grossièrement, pas quand je devrais les désactiver.
- La signification exacte du `^` devant les versions dans `package.json`.

---

## Phase 1 — JavaScript moderne + TypeScript

**Statut :** ✅ terminée · **Auto-évaluation :** intermédiaire **Temps pris:** 12 heures / 5 jours

### Ce que j'ai fait
- Exercice pour comprendre la différence entre `let` et `const`, l'usage des fonctions, des boucles, des objets.
- **Session « Phase 1 (suite) + typage + asynchrone » :** réécriture de mes boucles à la main
  avec `filter` / `map` / `reduce`, passage aux types nommés (`Ligne`, `Commande`),
  et découverte de l'asynchrone (Promises, `async`/`await`, `Promise.all`).

### Concepts clés compris
- **Variables :** `let` et `const`, leurs différences (`const` empêche la réassignation, mais n'empêche pas la modification d'un objet ou d'un tableau déclaré comme tel).
- **Types :** Types de base et inférence de TypeScript (TypeScript comprend le type avec la valeur de la variable), ce qui verrouille la réassignation de la variable (`100` ne peut pas devenir `"100"`, cela renvoie une erreur).
- **Tableaux et objets :** Compréhension des structures imbriquées et de l'usage des informations dans celles-ci (exemple : dernier élément du tableau = `length - 1`).
- **Fonctions :** Typage d'entrées et de sorties, typage des paramètres, tout ce qui différencie TypeScript de JavaScript et réduit la marge d'erreur.
- **Boucles :** Bouclage via `for` dans les structures.
- **Conditions :** Pour récupérer des informations spécifiques via `if`.
- **Méthodes de tableau** (remplacent les boucles écrites à la main) :
  - `filter` : sélectionne des éléments selon une condition → tableau plus court ou égal, éléments inchangés.
  - `map` : transforme chaque élément → tableau de même longueur, éléments transformés.
  - `reduce` : réduit une liste à une seule valeur (accumulateur + valeur de départ) —
    c'est mon `let total = 0` + boucle, en version outillée.
  - Elles se chaînent (`filter().map()`…) et ne modifient **jamais** le tableau d'origine
    (elles en créent un nouveau).
  - Bénéfice de sûreté observé : en passant par `map`, plus de `| undefined` —
    TypeScript sait que les éléments existent.
- **Fonctions fléchées (`=>`)** : syntaxe compacte pour les petites fonctions
  (`(n) => n > 20`). Corps d'une seule expression → accolades et `return` implicites.
  C'est la forme qu'on passe systématiquement à `filter`/`map`/`reduce`.
- **Lisibilité & commentaires (le jugement d'ingénieur)** : le code dit *comment* ;
  le commentaire doit dire *pourquoi* (une règle métier, une décision, un piège) —
  pas paraphraser le code. Un bon nommage rend la plupart des commentaires inutiles
  (`valeurCommandesPayees` se raconte tout seul). « Lisible » est relatif au lecteur :
  les boucles pour un débutant, `filter`/`map`/`reduce` pour un dev JS aguerri —
  objectif : être bilingue et choisir selon le contexte. La concision n'est pas
  l'argument ; l'intention déclarative et l'absence de variables mutables le sont.
- **Typage propre (types nommés)** : déclarer `type Ligne = {...}` et `type Commande = {...}`
  plutôt que `typeof commandes` (qui faisait dépendre la fonction d'une variable de
  données — à l'envers). Convention : types en **PascalCase** (`Commande`),
  variables/fonctions en **camelCase** (`totalCA`). Composition : `lignes: Ligne[]`
  (« tableau de Ligne »). Deux bénéfices concrets vérifiés : protection des données
  (une mauvaise valeur est refusée à la source) et autocomplétion dans l'éditeur.
  Graine plantée : les unions de littéraux (`statut: "payée" | "annulée"`) rendent
  le type plus précis et attrapent plus de bugs.
- **Asynchrone (le gros morceau)** :
  - Pourquoi : ne pas figer le programme pendant une opération longue (réseau, base, fichier).
  - **Promise** = un « ticket » promettant une valeur plus tard ;
    états `pending` / `fulfilled` / `rejected`.
  - **`async` / `await`** : `await` = « attends ici que la Promise soit tenue avant de
    continuer » ; utilisable seulement dans une fonction `async`.
  - Deux niveaux à ne pas confondre : `await` est séquentiel *à l'intérieur* d'une
    fonction ; le programme ne bloque pas *à l'extérieur*.
  - Modèle du **cuisinier unique** : JS ne fait pas plusieurs choses en même temps,
    il remplit les temps d'attente.
  - **`Promise.all([...])`** : lance des opérations indépendantes en parallèle (3 s → 1 s).
    Règle : `await` en série si dépendance, `Promise.all` si indépendance.
  - Le piège de l'`await` oublié : renvoie `Promise { <pending> }`, produit un résultat
    **faux et silencieux** (mon chrono à 0,04 ms). Diagnostic clé : un résultat qui
    « a l'air de marcher » mais que les chiffres démentent.

### Problèmes rencontrés → cause → solution

- **Problème :** Erreur d'imbrication.
  **Cause :** `products.length` n'existait pas dans le scope.
  **Solution / Remarque :** préciser d'où provenait `products` avec `paniers[0].products.length`.

- **Problème :** `Type 'string' is not assignable to type 'number'`
  **Cause :** On a essayé d'inférer une valeur de type chaîne de caractères alors que la variable a été initialisée avec une valeur de type nombre.
  **Solution / Remarque :** Le type verrouille la variable ; l'erreur est normale et attendue, elle prouve que TypeScript m'attrape avant l'exécution.

- **Problème :** `console.log` affiche `Promise { <pending> }` au lieu de la valeur.
  **Cause :** `await` oublié devant l'appel d'une fonction `async` → j'affiche le
  « ticket », pas le « plat ».
  **Solution / Remarque :** ajouter `await` devant l'appel. Piège vicieux : aucun
  crash, juste un résultat faux et silencieux.

- **Problème :** le chronomètre affiche ~0 ms (0,04 ms) pour des opérations censées
  durer plusieurs secondes.
  **Cause :** fonctions `async` appelées sans `await` → le chrono mesure le temps de
  *création* des Promises, pas leur exécution.
  **Solution / Remarque :** envelopper le code dans une fonction `async` et `await`
  chaque appel. À retenir : se méfier d'un résultat qui « a l'air de marcher »
  mais que les chiffres démentent.

- **Problème :** Lors de l'exercice d'évaluation, le finally ne renvoyait rien.
  **Cause :** J'ai oublié le console.log
  **Solution / Remarque :** Être plus vigilant quant aux bugs silencieux.

- **Problème :** Modélisation lors de l'exercice d'évaluation :dans mes lignes j'indiquait un tableau d'objets Produit hors chaque ligne = 1 produit, une quantité. J'avais une imbrication de reduce inutile.
  **Cause :** Erreur de modélisation en voulant complexifier l'exercice.
  **Solution / Remarque :** Bien penser au fait que si le code devient trop compliqué, c'est probablement parce que j'ai mal conçu le modèle de données. 

### Décisions techniques et pourquoi

- Passer la TVA en paramètre plutôt qu'en dur, afin d'éviter une limitation au niveau des paramètres (et si l'utilisateur était espagnol ? portugais ?).
- Commandes passées en paramètre de la fonction `calculCA`, ce qui permet de tester la fonction avec des valeurs différentes et plus uniquement celle déclarée à l'extérieur.
- `typeof commandes` pour typer le paramètre `commandes` → et la nuance : la façon « propre » sera un type `Commande` nommé, à voir plus tard.
- ✅ Fait : `commandes: Commande[]` (type nommé) au lieu de `typeof commandes` →
  fonction indépendante des données, réutilisable et lisible.
- Préférence assumée pour lire les boucles à mon niveau actuel, tout en m'entraînant
  à `filter`/`map`/`reduce` pour la lisibilité future.
- Lors de l'évaluation, j'ai décidé de complexifier les choses en enrichissant le modèle avec des types Produit et Client. Cela a entraîné un problème sur mon type Ligne que j'ai rapidement compris grâce à la correction.

### Encore flou / à revoir
- Tout est bon !

### Résumé de synthèse

**1. Variables & types**
- `const` par défaut, `let` seulement si réassignation nécessaire. `const` bloque
  la réassignation, pas la modification du contenu d'un objet/tableau.
- Types de base : `string`, `number` (entiers et décimaux confondus), `boolean`.
- Inférence : TypeScript déduit le type de la valeur. Le type verrouille ensuite
  avec quoi on peut réassigner.

**2. Objets & tableaux**
- Objet = valeurs nommées par clés, accès au `.` (`commande.statut`).
- Tableau = liste ordonnée, accès par index à partir de 0 (dernier = `length - 1`).
- Structures imbriquées : `paniers[0].products[1].nom`.

**3. Fonctions**
- Paramètres typés + type de retour = un contrat entrée/sortie.
- Fonctions fléchées : `(n) => n > 20`, corps d'une expression → `return` et
  accolades implicites.

**4. Conditions & boucles**
- `if` avec `===` (égalité stricte).
- `for...of` pour parcourir, boucles imbriquées, variable accumulatrice
  (`let total = 0` + `+=`).

**5. Méthodes de tableau** (remplacent les boucles à la main)
- `filter` : sélectionne → tableau plus court ou égal, éléments inchangés.
- `map` : transforme → tableau de même taille.
- `reduce` : réduit à une seule valeur (accumulateur + valeur de départ).
- Se chaînent (`filter().map()`), ne modifient jamais l'original.

**6. Typage propre**
- Types nommés : `type Ligne = {...}`, `type Commande = { lignes: Ligne[] }`.
- **PascalCase** pour les types, **camelCase** pour variables/fonctions.
- Bénéfices : protection des données + autocomplétion.
  Graine : unions de littéraux (`"payée" | "annulée"`).

**7. Asynchrone**
- `Promise` = « ticket » d'une valeur future ; états `pending` / `fulfilled` / `rejected`.
- `async`/`await` : `await` = « attends ici avant de continuer », seulement dans
  une fonction `async`.
- Séquentiel à l'intérieur, non bloquant à l'extérieur. Modèle du cuisinier unique.
- `Promise.all` : opérations indépendantes en parallèle (`await` en série si dépendance).
- Piège : `await` oublié → `Promise { <pending> }`, résultat faux et silencieux.

**8. Gestion d'erreurs**
- `try` / `catch` / `finally` (le `finally` s'exécute toujours).
- En strict, l'erreur du `catch` est `unknown` → narrowing avec
  `if (error instanceof Error)` pour accéder à `.message`.
- Graine : `Promise.allSettled` quand on veut le résultat de toutes,
  même en cas d'échec partiel.

**Réflexes transversaux :** lire une erreur, chercher dans la doc, vérifier le
résultat réel, code lisible (nommage > commentaires).
