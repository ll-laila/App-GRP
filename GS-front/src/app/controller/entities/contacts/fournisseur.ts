import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Produit } from 'src/app/controller/entities/produit/produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { LangueEnum } from 'src/app/controller/enums/langue-enum'
export class Fournisseur {
id!: number;
nom?: string ;
code?: string ;
email?: string ;
siteweb?: string ;
telephone?: string ;
adresse?: Adresse ;
taxeNumero!: number;
rabais!: number;
languePDF?: LangueEnum ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
taxe?: Taxe ;
produits?: Array<Produit> ;
entreprise?: Entreprise ;
}
