import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {StatutNiveauPrixEnum} from 'src/app/controller/enums/statut-niveau-prix-enum'

export class NiveauPrixValidator extends Validator< NiveauPrix> {
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
  actif = new ValidatorItem<boolean>(
    () => this.item().actif,
    (value) => this.item().actif = value,
    (value) => {
      this.actif.validators
        ?.required()
        ?.valid()
    }
  )
  type = new ValidatorItem<StatutNiveauPrixEnum>(
    () => this.item().type,
    (value) => this.item().type = value,
    (value) => {
      this.type.validators
        ?.errorIf(value == null, "Aucun Type n'a été fourni!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.nom,
    this.actif,
    this.type,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => NiveauPrix): NiveauPrixValidator {
    const validator = new NiveauPrixValidator()
    validator.item = item
    return validator;
  }

}
