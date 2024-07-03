import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {MethodePaiement} from "src/app/controller/entities/parametres/methode-paiement";

export class MethodePaiementValidator extends Validator< MethodePaiement> {

  disponiblePos = new ValidatorItem<boolean>(
    () => this.item().disponiblePos,
    (value) => this.item().disponiblePos = value,
    (value) => {
      this.disponiblePos.validators
        ?.required()
        ?.valid()
    }
  )
  actif = new ValidatorItem<boolean>(
    () => this.item().actif,
    (value) => this.item().actif = value,
    (value) => {
      this.actif.validators
        ?.required()
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.disponiblePos,
    this.actif,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => MethodePaiement): MethodePaiementValidator {
    const validator = new MethodePaiementValidator()
    validator.item = item
    return validator;
  }

}
