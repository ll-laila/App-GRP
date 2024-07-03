import { DestinataireEmploye } from 'src/app/controller/entities/parametres/destinataire-employe';
import { Admin } from 'src/app/controller/entities/contacts/user/admin';
import { StatutAlerteEnum } from 'src/app/controller/enums/statut-alerte-enum'
export class Alerte {
id!: number;
nom?: string ;
statut?: StatutAlerteEnum ;
actif?: boolean ;
destinataireEmploye?: Array<DestinataireEmploye> ;
admin?: Admin ;
}
