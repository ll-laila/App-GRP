import {Produit} from 'src/app/controller/entities/produit/produit';
import {Commande} from 'src/app/controller/entities/ventes/commande/commande';

export class CommandeProduit {
  id!: number;
  total!: number;
  quantite!: number;
  disque!: number;
  produit?: Produit;
  commande?: Commande;
  prix!: number;
  disponible!: number;

}
