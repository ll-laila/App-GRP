import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { Alerte } from 'src/app/controller/entities/parametres/alerte';
import { LangueEnum } from 'src/app/controller/enums/langue-enum'
import {AppUser} from "src/app/controller/auth/entities/app-user";
export class Admin extends AppUser {
nom?: string ;
prenom?: string ;
telephone?: string ;
adresse?: Adresse ;
languePDF?: LangueEnum ;
entreprise?: Entreprise ;
alertes?: Array<Alerte> ;
}
