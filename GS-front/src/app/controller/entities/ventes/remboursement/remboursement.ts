import { Client } from 'src/app/controller/entities/contacts/client';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { RemboursementProduit } from 'src/app/controller/entities/ventes/remboursement/remboursement-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { StatutRemboursementEnum } from 'src/app/controller/enums/statut-remboursement-enum'
export class Remboursement {
id!: number;
code?: string ;
client?: Client ;
dateCreation?: Date ;
dateExpedition?: Date ;
totalUnites!: number;
remiseGlobal!: number;
sousTotal!: number;
total!: number;
statut?: StatutRemboursementEnum ;
taxe?: Taxe ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
addressFacturation?: Adresse ;
remboursementProduit?: Array<RemboursementProduit> ;
entreprise?: Entreprise ;
}
