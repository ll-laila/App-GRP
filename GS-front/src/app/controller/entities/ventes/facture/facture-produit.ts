import { Produit } from 'src/app/controller/entities/produit/produit';
import { Facture } from 'src/app/controller/entities/ventes/facture/facture';
export class FactureProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
facture?: Facture ;
disponible ?: number;
prix ?: number;
}
