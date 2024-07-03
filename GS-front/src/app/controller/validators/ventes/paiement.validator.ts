import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Paiement} from "src/app/controller/entities/ventes/paiement";
import {MethodePaiement} from 'src/app/controller/entities/parametres/methode-paiement';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';

export class PaiementValidator extends Validator< Paiement> {
  /*datePaiement = new ValidatorItem<Date>(
    () => this.item().datePaiement,
    (value) => this.item().datePaiement = value,
    (value) => {
      this.datePaiement.validators
        ?.required()
        ?.valid()
    }
  )
  methodePaiement = new ValidatorItem<MethodePaiement>(
    () => this.item().methodePaiement,
    (value) => this.item().methodePaiement = value,
    (value) => {
      this.methodePaiement.validators
        ?.errorIf(value?.id == null, "Aucune  MethodePaiement n'a été fourni!")
        ?.valid()
    }
  )
 entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "Aucune Entreprise n'a été fournie!")
        ?.valid()
    }
  )
*/
  override validatorItems: ValidatorItem< any>[] = [
   // this.datePaiement,
    //this.montantPaye,
    //this.methodePaiement,
    //this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Paiement): PaiementValidator {
    const validator = new PaiementValidator()
    validator.item = item
    return validator;
  }

}
