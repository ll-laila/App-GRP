import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {EntrepriseDevises} from "src/app/controller/entities/parametres/entreprise-devises";
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {Devises} from 'src/app/controller/entities/parametres/devises';

export class EntrepriseDevisesValidator extends Validator< EntrepriseDevises> {
  defaut = new ValidatorItem<boolean>(
    () => this.item().defaut,
    (value) => this.item().defaut = value,
    (value) => {
      this.defaut.validators
        ?.required()
        ?.valid()
    }
  )
  entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "No Entreprise Was Provided!")
        ?.valid()
    }
  )
  devises = new ValidatorItem<Devises>(
    () => this.item().devises,
    (value) => this.item().devises = value,
    (value) => {
      this.devises.validators
        ?.errorIf(value?.id == null, "No Devises Was Provided!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.defaut,
    this.entreprise,
    this.devises,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => EntrepriseDevises): EntrepriseDevisesValidator {
    const validator = new EntrepriseDevisesValidator()
    validator.item = item
    return validator;
  }

}
