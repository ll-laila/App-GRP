import { Produit } from 'src/app/controller/entities/produit/produit';
import { RetourProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit';
export class RetourProduitProduit {
id!: number;
quantite!: number;
cout!: number;
produit?: Produit ;
retourProduit?: RetourProduit ;
prix?:number;
total?:number;
disponible?: number;
disque?: number;
sousTotal?: number;
}
