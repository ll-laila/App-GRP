import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {NouvelleDevise} from "src/app/controller/entities/parametres/nouvelle-devise";
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';

export class NouvelleDeviseValidator extends Validator< NouvelleDevise> {
  labelle = new ValidatorItem<string>(
    () => this.item().labelle,
    (value) => this.item().labelle = value,
    (value) => {
      this.labelle.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.labelle,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => NouvelleDevise): NouvelleDeviseValidator {
    const validator = new NouvelleDeviseValidator()
    validator.item = item
    return validator;
  }

}
