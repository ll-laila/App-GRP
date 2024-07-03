import { Produit } from 'src/app/controller/entities/produit/produit';
import { Remboursement } from 'src/app/controller/entities/ventes/remboursement/remboursement';
export class RemboursementProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
remboursement?: Remboursement ;
}
