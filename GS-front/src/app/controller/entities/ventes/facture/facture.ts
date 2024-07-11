import { Paiement } from 'src/app/controller/entities/ventes/paiement';
import { RetourProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Client } from 'src/app/controller/entities/contacts/client';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { FactureProduit } from 'src/app/controller/entities/ventes/facture/facture-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { TypeRabaisEnum } from 'src/app/controller/enums/type-rabais-enum'
import { StatutFactureEnum } from 'src/app/controller/enums/statut-facture-enum'
import {Commande} from "../commande/commande";
import {AppUser} from "../../../auth/entities/app-user";


export class Facture {
id!: number;
code?: string ;
dateExperation?: Date ;
dateCreation?: Date ;
dateExpedition?: Date ;
rabais!: number;
typeRabais?: TypeRabaisEnum ;
totalUnites!: number;
remiseGlobal!: number;
sousTotal!: number;
total!: number;
statut?: StatutFactureEnum ;
paiement?: Paiement ;
retourProduit?: RetourProduit ;
taxe?: Taxe ;
taxeExpedition?: Taxe ;
client?: Client ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
addressFacturation?: Adresse ;
addressExpedition?: Adresse ;
factureProduit?: Array<FactureProduit> ;
entreprise?: Entreprise ;
commande?:Commande;
}
