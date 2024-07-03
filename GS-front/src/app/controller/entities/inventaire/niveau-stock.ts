import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import {Produit} from "../produit/produit";
export class NiveauStock {
id!: number;
nom?: string ;
sku?: string ;
disponible?: string ;
entreprise?: Entreprise ;
produits?: Array<Produit>;
}
