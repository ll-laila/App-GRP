import { Produit } from 'src/app/controller/entities/produit/produit';
import { Livraison } from 'src/app/controller/entities/inventaire/livraison/livraison';
export class LivraisonProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
livraison?: Livraison ;
prix?:number;
}
