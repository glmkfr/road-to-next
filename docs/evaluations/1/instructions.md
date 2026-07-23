# 📝 Évaluation de fin de Phase 1

Un seul exercice, cohérent, qui t'oblige à mobiliser presque tout. Le contexte est volontairement dans ton univers (e-commerce) pour que tu te concentres sur la technique.

## Contexte

Tu dois écrire un petit module qui calcule un rapport de ventes à partir de commandes récupérées depuis une « API » (qu'on va simuler, comme on l'a fait avec `getPrixRisque`).

## Données de départ

Colle-les telles quelles :

```typescript
const donneesBrutes = [
  { id: 1, statut: "payée",   client: "Alice", lignes: [{ produit: "T-shirt", prix: 20, qte: 2 }, { produit: "Mug", prix: 8, qte: 3 }] },
  { id: 2, statut: "annulée", client: "Bob",   lignes: [{ produit: "Casquette", prix: 15, qte: 1 }] },
  { id: 3, statut: "payée",   client: "Alice", lignes: [{ produit: "Sticker", prix: 3, qte: 10 }] },
  { id: 4, statut: "payée",   client: "Chloé", lignes: [{ produit: "Poster", prix: 12, qte: 2 }] },
];
```

## Ce que tu dois produire, étape par étape

### 1. Types

Déclare des types nommés `LigneCommande` et `Commande`. Pour le statut, utilise une union de littéraux (`"payée" | "annulée"`) — la graine qu'on avait plantée, c'est le moment de la faire pousser. Annote `donneesBrutes` avec ton type.

### 2. `totalCommande`

Une fonction qui prend une commande et renvoie son montant total (`number`) — somme des `prix × qte` de ses lignes. Utilise `reduce`.

### 3. `rapportVentes`

Une fonction qui prend un tableau de commandes et renvoie un objet `{ chiffreAffaires: number, nombreCommandesPayees: number }`, en ne comptant que les commandes payées. Sers-toi de `filter`, `map`/`reduce`, et de ta fonction `totalCommande`.

### 4. `chargerCommandes`

Une fonction asynchrone qui simule un appel API : elle renvoie une `Promise` qui, après un `setTimeout` de 500 ms, soit **resolve** les `donneesBrutes`, soit **reject** avec une `Error("API indisponible")` — au hasard (comme `getPrixRisque`).

### 5. `afficherRapport`

Une fonction asynchrone qui, dans un `try`/`catch`/`finally` :

- **try** : `await chargerCommandes()`, passe le résultat à `rapportVentes`, et affiche le rapport ;
- **catch** : gère l'erreur proprement (avec `instanceof Error`) ;
- **finally** : affiche « Traitement terminé ».

Puis appelle-la (avec `await`), et relance plusieurs fois pour voir les deux cas.

## Résultat attendu

Quand l'API réussit : chiffre d'affaires = 40 + 24 + 30 + 24 = **118 €**, sur **3 commandes payées**. Vérifie à la main que tu retombes dessus.
