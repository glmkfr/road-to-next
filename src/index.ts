const commandes = [
  { id: 1, statut: "payée",   lignes: [{ prix: 20, qte: 2 }, { prix: 5, qte: 3 }] },
  { id: 2, statut: "annulée", lignes: [{ prix: 100, qte: 1 }] },
  { id: 3, statut: "payée",   lignes: [{ prix: 8, qte: 10 }] },
];

function calculCA(commande: typeof commandes) :number{
    let total = 0
    for (const c of commande){
        if(c.statut === "payée"){
            for(const l of c.lignes){
                total += (l.prix * l.qte)
            }
        }
    }
    return total;
}

console.log(calculCA(commandes))