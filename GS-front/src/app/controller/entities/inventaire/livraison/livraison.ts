import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Fournisseur } from 'src/app/controller/entities/contacts/fournisseur';
import { LivraisonProduit } from 'src/app/controller/entities/inventaire/livraison/livraison-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { StatutLivraisonEnum } from 'src/app/controller/enums/statut-livraison-enum'
import {NiveauPrix} from "../../parametres/niveau-prix";
import {BonCommande} from "../boncommande/bon-commande";
export class Livraison {
id!: number;
code?: string ;
dateCreation?: Date ;
dateExpedition?: Date ;
remiseGlobal!: number;
totalUnites!: number;
sousTotal!: number;
total!: number;
statut?: StatutLivraisonEnum ;
taxeExpedition?: Taxe ;
fournisseur?: Fournisseur ;
livraisonProduit?: Array<LivraisonProduit> ;
entreprise?: Entreprise ;
bonCommande?: BonCommande;
}
