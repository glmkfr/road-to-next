//1
type Produit = {
  id: number;
  nom: string;
  prix: number; 
}

type Client = {
  id: number;
  nom: string;
  prenom: string;
}

type Ligne = {
  produit: Produit;
  qte: number;
}

type Commande = {
  id: number;
  statut: "Payée"|"Annulée"|"Remboursée";
  client: Client;
  lignes: Ligne[];
}

const commandes : Commande[] = [
  { id: 2, statut: "Payée", client: {id: 4, nom:"Deschamps", prenom:"Didier"}, lignes:[{produit: {id: 300, nom:'Booster Yu-gi-oh', prix: 5.99},qte:4}]},
  { id: 3, statut: "Annulée", client: {id: 7, nom:"Martin", prenom:"Sophie"}, lignes:[{produit: {id: 301, nom:'Deck Magic: The Gathering', prix: 24.90},qte:1}]},
  { id: 4, statut: "Payée", client: {id: 12, nom:"Bernard", prenom:"Lucas"}, lignes:[{produit: {id: 302, nom:'Booster Pokémon Écarlate', prix: 6.50},qte:10},{produit: {id: 303, nom:'Classeur de rangement', prix: 19.99},qte:1}]},
  { id: 5, statut: "Remboursée", client: {id: 3, nom:"Petit", prenom:"Emma"}, lignes:[{produit: {id: 304, nom:'Tapis de jeu XXL', prix: 34.95},qte:1}]},
  { id: 6, statut: "Payée", client: {id: 21, nom:"Durand", prenom:"Hugo"}, lignes:[{produit: {id: 305, nom:'Protège-cartes x100', prix: 8.75},qte:3}]},
  { id: 7, statut: "Payée", client: {id: 7, nom:"Martin", prenom:"Sophie"}, lignes:[{produit: {id: 300, nom:'Booster Yu-gi-oh', prix: 5.99},qte:2},{produit: {id: 306, nom:'Boîte de deck', prix: 12.50},qte:2}]},
  { id: 8, statut: "Annulée", client: {id: 15, nom:"Leroy", prenom:"Chloé"}, lignes:[{produit: {id: 307, nom:'Display One Piece Card Game', prix: 89.99},qte:1}]},
  { id: 9, statut: "Payée", client: {id: 9, nom:"Moreau", prenom:"Nathan"}, lignes:[{produit: {id: 308, nom:'Carte promo Dracaufeu', prix: 149.00},qte:1}]},
  { id: 10, statut: "Remboursée", client: {id: 18, nom:"Roux", prenom:"Léa"}, lignes:[{produit: {id: 302, nom:'Booster Pokémon Écarlate', prix: 6.50},qte:6}]},
  { id: 11, statut: "Payée", client: {id: 25, nom:"Garnier", prenom:"Tom"}, lignes:[{produit: {id: 309, nom:'Starter Deck Lorcana', prix: 16.99},qte:2},{produit: {id: 305, nom:'Protège-cartes x100', prix: 8.75},qte:1},{produit: {id: 306, nom:'Boîte de deck', prix: 12.50},qte:1}]}
]

//2
function totalCommande(commande : Commande): number {
  return commande.lignes.reduce((total, ligne) => {
    const totalLigne = ligne.produit.prix * ligne.qte;
    return total + totalLigne;
  }, 0);
}

type RapportVente =
{
chiffreAffaires: number;
nombreCommandesPayees: number;
}

//3
function creerRapportVentes(commandes:Commande[]) :RapportVente{
  let CA = 0
  const CP = commandes.filter(c => c.statut === "Payée")
  for (const commande of CP){
      CA += totalCommande(commande);
  }

  return {
   chiffreAffaires: CA,
   nombreCommandesPayees: CP.length 
  };
}
//4
async function chargerCommandes(cmd : Commande[]): Promise<Commande[]> {
return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(cmd);                       // succès : la Promise est "fulfilled"
      } else {
        reject(new Error("Serveur injoignable")); // échec : "rejected"
      }
    }, 500);
  })
  
}

//5
async function afficherRapport(){
  console.log("Début du traitement");
  try {
    const charger = await chargerCommandes(commandes);
    console.log(creerRapportVentes(charger));
    
  } catch (error) {
    if (error instanceof Error){
       console.log("Erreur:", error.message);
    } else {
      console.log("Erreur inattendue");
    }
  } finally {
    console.log("Traitement terminé");
  }
}

afficherRapport();