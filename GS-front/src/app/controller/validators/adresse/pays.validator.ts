import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Pays} from "src/app/controller/entities/adresse/pays";

export class PaysValidator extends Validator< Pays> {
  name = new ValidatorItem<string>(
    () => this.item().name,
    (value) => this.item().name = value,
    (value) => {
      this.name.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.name,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Pays): PaysValidator {
    const validator = new PaysValidator()
    validator.item = item
    return validator;
  }

}
