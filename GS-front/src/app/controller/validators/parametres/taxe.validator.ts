import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Taxe} from "src/app/controller/entities/parametres/taxe";

export class TaxeValidator extends Validator< Taxe> {
  nom = new ValidatorItem<string>(
    () => this.item().nom,
    (value) => this.item().nom = value,
    (value) => {
      this.nom.stringValidators
        ?.required()
          ?.pattern(/^[a-zA-Z0-9]+$/, 'Nom invalide, Veuillez entrer un nom contenant uniquement des lettres et/ou des chiffres')
        ?.valid()
    }
  )
  tauxImposition = new ValidatorItem<number>(
    () => this.item().tauxImposition,
    (value) => this.item().tauxImposition = value  || 0,
    (value) => {
      this.tauxImposition.numberValidators
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
    this.nom,
    this.tauxImposition,
    this.actif,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Taxe): TaxeValidator {
    const validator = new TaxeValidator()
    validator.item = item
    return validator;
  }

}
