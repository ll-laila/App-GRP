import { Taxe } from 'src/app/controller/entities/parametres/taxe';
import { Client } from 'src/app/controller/entities/contacts/client';
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { NoteCreditProduit } from 'src/app/controller/entities/ventes/notecredit/note-credit-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { StatutNoteCreditEnum } from 'src/app/controller/enums/statut-note-credit-enum'
export class NoteCredit {
id!: number;
code?: string ;
dateExperation?: Date ;
dateCreation?: Date ;
dateExpedition?: Date ;
totalUnites!: number;
remiseGlobal!: number;
sousTotal!: number;
total!: number;
statut?: StatutNoteCreditEnum ;
taxe?: Taxe ;
client?: Client ;
devises?: Devises ;
niveauPrix?: NiveauPrix ;
addressFacturation?: Adresse ;
noteCreditProduit?: Array<NoteCreditProduit> ;
entreprise?: Entreprise ;
}
