import { Produit } from 'src/app/controller/entities/produit/produit';
import { BonCommande } from 'src/app/controller/entities/inventaire/boncommande/bon-commande';
export class BonCommandeProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
bonCommande?: BonCommande ;
prix?:number;
disponible?: number;
sousTotal?: number;

}
