import { Produit } from 'src/app/controller/entities/produit/produit';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
export class ProduitNiveauPrix {
id!: number;
prix!: number;
produit?: Produit ;
niveauPrix?: NiveauPrix ;
}
