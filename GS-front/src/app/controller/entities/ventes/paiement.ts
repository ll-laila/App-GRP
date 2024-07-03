import { MethodePaiement } from 'src/app/controller/entities/parametres/methode-paiement';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
export class Paiement {
id!: number;
datePaiement?: Date ;
montantPaye!: number;
methodePaiement?: MethodePaiement ;
entreprise?: Entreprise ;
}
