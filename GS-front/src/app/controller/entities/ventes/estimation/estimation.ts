import { Facture } from 'src/app/controller/entities/ventes/facture/facture';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Client } from 'src/app/controller/entities/contacts/client';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { EstimationProduit } from 'src/app/controller/entities/ventes/estimation/estimation-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { TypeRabaisEnum } from 'src/app/controller/enums/type-rabais-enum'
import { StatutEstimationEnum } from 'src/app/controller/enums/statut-estimation-enum'
export class Estimation {
id!: number;
code?: string ;
dateExperation?: Date ;
dateCreation?: Date ;
dateExpedition?: Date ;
rabais!: number;
typeRabais?: TypeRabaisEnum ;
remiseGlobal!: number;
totalUnites!: number;
sousTotal!: number;
total!: number;
statut?: StatutEstimationEnum ;
facture?: Facture ;
taxe?: Taxe ;
taxeExpedition?: Taxe ;
client?: Client ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
addressFacturation?: Adresse ;
addressExpedition?: Adresse ;
estimationProduit?: Array<EstimationProduit> ;
entreprise?: Entreprise ;
}
