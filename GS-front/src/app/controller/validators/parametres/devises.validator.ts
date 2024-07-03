import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NouvelleDevise} from 'src/app/controller/entities/parametres/nouvelle-devise';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';

export class DevisesValidator extends Validator< Devises> {
  tauxDeChange = new ValidatorItem<number>(
    () => this.item().tauxDeChange,
    (value) => this.item().tauxDeChange = value  || 0,
    (value) => {
      this.tauxDeChange.numberValidators
        ?.required()
        ?.valid()
    }
  )
  nouvelleDevise = new ValidatorItem<NouvelleDevise>(
    () => this.item().nouvelleDevise,
    (value) => this.item().nouvelleDevise = value,
    (value) => {
      this.nouvelleDevise.validators
        ?.errorIf(value?.id == null, "Aucun NouvelleDevise n'a été fournie!")
        ?.valid()
    }
  )


  override validatorItems: ValidatorItem< any>[] = [
    this.tauxDeChange,
    this.nouvelleDevise,

  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Devises): DevisesValidator {
    const validator = new DevisesValidator()
    validator.item = item
    return validator;
  }

}
