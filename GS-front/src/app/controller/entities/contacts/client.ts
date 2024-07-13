import {Adresse} from 'src/app/controller/entities/adresse/adresse';
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {LangueEnum} from 'src/app/controller/enums/langue-enum'
import {ClientProduitNiveauPrix} from "../clientProduitNiveauPrix/clientProduitNiveauPrix";

export class Client {
  id!: number;
  nom?: string;
  code?: string;
  email?: string;
  siteweb?: string;
  telephone?: string;
  taxeNumero!: number;
  rabais!: number;
  languePDF?: LangueEnum;
  valeurCommandeMinimale!: number;
  adresse?: Adresse;
  devises?: Devises;
  niveauPrix!: NiveauPrix | undefined;
  taxe?: Taxe;
  entreprise?: Entreprise;
  clientProduitNiveauPrix ?: ClientProduitNiveauPrix [];
}
