import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {Pays} from 'src/app/controller/entities/adresse/pays';

export class AdresseValidator extends Validator< Adresse> {
 /* address1 = new ValidatorItem<string>(
    () => this.item().address1,
    (value) => this.item().address1 = value,
    (value) => {
      this.address1.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )
  address2 = new ValidatorItem<string>(
    () => this.item().address2,
    (value) => this.item().address2 = value,
    (value) => {
      this.address2.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )
  postalCode = new ValidatorItem<string>(
    () => this.item().postalCode,
    (value) => this.item().postalCode = value,
    (value) => {
      this.postalCode.stringValidators
        ?.required()
        ?.pattern(/^[0-9]+$/,'Code invalide,Veuillez entrer un code contenant uniquement des chiffres')
        ?.valid()
    }
  )
  city = new ValidatorItem<string>(
    () => this.item().city,
    (value) => this.item().city = value,
    (value) => {
      this.city.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )
  pays = new ValidatorItem<Pays>(
    () => this.item().pays,
    (value) => this.item().pays = value,
    (value) => {
      this.pays.validators
        ?.errorIf(value?.id == null, "No Pays Was Provided!")
        ?.valid()
    }
  )*/

  override validatorItems: ValidatorItem< any>[] = [

  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Adresse): AdresseValidator {
    const validator = new AdresseValidator()
    validator.item = item
    return validator;
  }

}
