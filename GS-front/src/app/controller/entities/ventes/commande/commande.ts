import { Facture } from 'src/app/controller/entities/ventes/facture/facture';
import { CommandeExpedition } from 'src/app/controller/entities/ventes/commande-expedition';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Client } from 'src/app/controller/entities/contacts/client';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { CommandeProduit } from 'src/app/controller/entities/ventes/commande/commande-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { TypeRabaisEnum } from 'src/app/controller/enums/type-rabais-enum'
import { StatutCommandeEnum } from 'src/app/controller/enums/statut-commande-enum'
export class Commande {
id!: number;
code?: string ;
dateExperation?: Date ;
dateCreation?: Date ;
dateExpedition?: Date ;
rabais!: number;
remiseGlobal!: number;
typeRabais?: TypeRabaisEnum ;
totalUnites!: number;
sousTotal!: number;
total!: number;
statut?: StatutCommandeEnum ;
facture?: Facture ;
commandeExpedition?: Array<CommandeExpedition> ;
taxe?: Taxe ;
taxeExpedition?: Taxe ;
client?: Client ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
addressFacturation?: Adresse ;
addressExpedition?: Adresse ;
commandeProduit?: Array<CommandeProduit> ;
entreprise?: Entreprise ;
}
