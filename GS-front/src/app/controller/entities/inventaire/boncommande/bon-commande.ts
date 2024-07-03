import { Livraison } from 'src/app/controller/entities/inventaire/livraison/livraison';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Fournisseur } from 'src/app/controller/entities/contacts/fournisseur';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { BonCommandeProduit } from 'src/app/controller/entities/inventaire/boncommande/bon-commande-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { TypeRabaisEnum } from 'src/app/controller/enums/type-rabais-enum'
import { StatutBonCommandeEnum } from 'src/app/controller/enums/statut-bon-commande-enum'
export class BonCommande {
id!: number;
code?: string ;
dateCreation?: Date ;
dateExpedition?: Date ;
rabais!: number;
typeRabais?: TypeRabaisEnum ;
remiseGlobal!: number;
totalUnites!: number;
sousTotal!: number;
total!: number;
statut?: StatutBonCommandeEnum ;
livraison?: Livraison ;
taxe?: Taxe ;
taxeExpedition?: Taxe ;
fournisseur?: Fournisseur ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
bonCommandeProduit?: Array<BonCommandeProduit> ;
entreprise?: Entreprise ;
}
