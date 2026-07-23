type Ligne = {
    prix: number;
    qte: number;
};
  
type Commande = { 
    id: number;
    statut: string;
    lignes: Ligne[];
};



const commandes : Commande[] = [
  { id: 1, statut: "payée",   lignes: [{ prix: 20, qte: 2 }, { prix: 5, qte: 3 }] },
  { id: 2, statut: "annulée", lignes: [{ prix: 100, qte: 1 }] },
  { id: 3, statut: "payée",   lignes: [{ prix: 8, qte: 10 }] },
];

const commandesPayees = commandes.filter(c => c.statut === "payée");
// console.log(commandesPayees);

const TotauxCommandes = commandes.map(c => c.lignes.length);
// console.log(TotauxCommandes);

const prix = [20,10,4];
const totalPrix = prix.reduce((acc, p) => acc + p, 0);
// console.log(totalPrix);
const commande = commandes[0];
const totalPrixCommande = commande?.lignes.reduce((acc, l) => acc + (l.prix * l.qte), 0);
// console.log(totalPrixCommande);

function calculCA(commande: Commande[]) :number{
    const valeurCommandesPayees = commande.filter(c => c.statut === "payée").map(c => c.lignes.reduce((acc, l) => acc + (l.prix * l.qte), 0));
    const totalCA = valeurCommandesPayees.reduce((acc, v) => acc + v, 0);
    return totalCA;
}

 // console.log(calculCA(commandes))

// console.log("1 — avant");

// setTimeout(() => {
//  console.log("2 — dans le setTimeout (après 0 seconde)");
// }, 0);

// console.log("3 — après");

// Simule une requête qui met 1 seconde à renvoyer un prix.
// Elle renvoie une Promise<number> : "une promesse de nombre".
function getPrix(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(42), 1000);
  });
}

async function afficherPrix() {
  console.log("Je lance la requête...");
  const prix = await getPrix();   // on ATTEND ici que la promesse soit tenue
  console.log("Prix reçu :", prix);
}

// afficherPrix();


async function versionSerie() {
  const prix1 = await getPrix();
  const prix2 = await getPrix();
  const prix3 = await getPrix();
  const somme = prix1 + prix2 + prix3;
  console.log("Somme série :", somme);
}

async function versionParallele() {
  const prices = await Promise.all([getPrix(), getPrix(), getPrix()]);
  const somme = prices.reduce((acc, p) => acc + p, 0);
  console.log("Somme parallèle :", somme);
}


/* async function mesurer() {
     console.time("Série");
     await versionSerie();
     console.timeEnd("Série");

     console.time("Parallèle");
     await versionParallele();
     console.timeEnd("Parallèle");
   }

   mesurer(); */


   function getPrixRisque(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(42);                       // succès : la Promise est "fulfilled"
      } else {
        reject(new Error("Serveur injoignable")); // échec : "rejected"
      }
    }, 500);
  });
}
async function afficherPrixRisque() {
  console.log("On cherche le prix, attends...")
  try {
    const prix = await getPrixRisque();
    console.log("Prix:", prix);
  }
  catch (error) {
    if (error instanceof Error) {
      console.log("Erreur:", error.message);
    } else {
      console.log("Erreur inattendue");
    }
  } finally{
    console.log("Chargement terminé")
  }
}

 afficherPrixRisque();