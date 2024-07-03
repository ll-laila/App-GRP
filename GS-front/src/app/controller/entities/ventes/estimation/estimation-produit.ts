import { Produit } from 'src/app/controller/entities/produit/produit';
import { Estimation } from 'src/app/controller/entities/ventes/estimation/estimation';
export class EstimationProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
estimation?: Estimation ;
}
