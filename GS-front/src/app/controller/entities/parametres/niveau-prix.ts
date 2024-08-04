import { ProduitNiveauPrix } from 'src/app/controller/entities/produit/produit-niveau-prix';
import { StatutNiveauPrixEnum } from 'src/app/controller/enums/statut-niveau-prix-enum'
export class NiveauPrix {
id!: number;
nom?: string ;
type?: StatutNiveauPrixEnum ;
actif?: boolean ;
produitNiveauPrix?: Array<ProduitNiveauPrix> ;
idEntreprise?: number;
}
