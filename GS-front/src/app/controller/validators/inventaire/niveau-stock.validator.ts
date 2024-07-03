import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';

export class NiveauStockValidator extends Validator< NiveauStock> {
  nom = new ValidatorItem<string>(
    () => this.item().nom,
    (value) => this.item().nom = value,
    (value) => {
      this.nom.stringValidators
        ?.required()
        ?.valid()
    }
  )
  sku = new ValidatorItem<string>(
    () => this.item().sku,
    (value) => this.item().sku = value,
    (value) => {
      this.sku.stringValidators
        ?.required()
        ?.valid()
    }
  )
  disponible = new ValidatorItem<string>(
    () => this.item().disponible,
    (value) => this.item().disponible = value,
    (value) => {
      this.disponible.stringValidators
        ?.required()
        ?.valid()
    }
  )
 /* entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "No Entreprise Was Provided!")
        ?.valid()
    }
  )*/

  override validatorItems: ValidatorItem< any>[] = [
    this.nom,
    this.sku,
    this.disponible,
  //  this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => NiveauStock): NiveauStockValidator {
    const validator = new NiveauStockValidator()
    validator.item = item
    return validator;
  }

}
