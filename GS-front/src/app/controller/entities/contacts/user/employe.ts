import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { DestinataireEmploye } from 'src/app/controller/entities/parametres/destinataire-employe';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import {AppUser} from "src/app/controller/auth/entities/app-user";
import {PermissionsAcces} from "./PermissionsAcces";


export class Employe extends AppUser {
    code?: string ;
    nom?: string ;
    prenom?: string ;
    telephone?: string ;
    adresse?: Adresse ;
    destinataireEmploye?: Array<DestinataireEmploye> ;
    entreprise?: Entreprise ;
    entreprisesAdroitAcces?: Entreprise[];
    permissionsAcces?: PermissionsAcces[];
    admin?: string;
}
