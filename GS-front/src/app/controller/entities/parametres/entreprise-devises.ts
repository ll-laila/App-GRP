import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { Devises } from 'src/app/controller/entities/parametres/devises';
export class EntrepriseDevises {
id!: number;
defaut?: boolean ;
entreprise?: Entreprise ;
devises?: Devises ;
}
