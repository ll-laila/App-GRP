import { Paiement } from 'src/app/controller/entities/ventes/paiement';
import { RetourProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit';
import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Client } from 'src/app/controller/entities/contacts/client';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { DevisProduit } from 'src/app/controller/entities/ventes/devis/devis-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { TypeRabaisEnum } from 'src/app/controller/enums/type-rabais-enum'
import { StatutDevisEnum } from 'src/app/controller/enums/statut-devis-enum'
export class Devis {
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
statut?: StatutDevisEnum ;
paiement?: Paiement ;
retourProduit?: RetourProduit ;
taxe?: Taxe ;
taxeExpedition?: Taxe ;
client?: Client ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
devisProduit?: Array<DevisProduit> ;
entreprise?: Entreprise ;
}
