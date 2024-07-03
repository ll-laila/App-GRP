import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { Commande } from 'src/app/controller/entities/ventes/commande/commande';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { StatutCommandeExpeditionEnum } from 'src/app/controller/enums/statut-commande-expedition-enum'
export class CommandeExpedition {
id!: number;
code?: string ;
dateCreation?: Date ;
dateExpedition?: Date ;
statut?: StatutCommandeExpeditionEnum ;
addressExpedition?: Adresse ;
commande?: Commande ;
entreprise?: Entreprise ;
}
