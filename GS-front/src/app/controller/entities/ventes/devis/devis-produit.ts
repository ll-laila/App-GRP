import { Produit } from 'src/app/controller/entities/produit/produit';
import { Devis } from 'src/app/controller/entities/ventes/devis/devis';
export class DevisProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
devis?: Devis ;
prix ?: number;
  disponible ?: number;

}
