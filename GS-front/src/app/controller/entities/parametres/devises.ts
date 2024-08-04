import { NouvelleDevise } from 'src/app/controller/entities/parametres/nouvelle-devise';
import { EntrepriseDevises } from 'src/app/controller/entities/parametres/entreprise-devises';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
export class Devises {
id!: number;
tauxDeChange!: number;
nouvelleDevise?: NouvelleDevise ;
entrepriseDevises?: Array<EntrepriseDevises> ;
entreprise?: Entreprise ;
idEntreprise?: number;
}
