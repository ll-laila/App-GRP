import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {AdresseValidator} from 'src/app/controller/validators/adresse/adresse.validator';
import {AppUserValidator} from "src/app/controller/auth/validators/app-user.validator";

export class EmployeValidator extends AppUserValidator< Employe> {
  code = new ValidatorItem<string>(
    () => this.item().code,
    (value) => this.item().code = value,
    (value) => {
      this.code.stringValidators
        ?.required()
        ?.valid()
    }
  )
  nom = new ValidatorItem<string>(
    () => this.item().nom,
    (value) => this.item().nom = value,
    (value) => {
      this.nom.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')
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
  prenom = new ValidatorItem<string>(
    () => this.item().prenom,
    (value) => this.item().prenom = value,
    (value) => {
      this.prenom.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')
        ?.valid()
    }
  )
  telephone = new ValidatorItem<string>(
    () => this.item().telephone,
    (value) => this.item().telephone = value,
    (value) => {
      this.telephone.stringValidators
        ?.required()
        ?.pattern(/^(?:[0-9] ?){6,14}[0-9]$/,'Téléphone invalide')
        ?.valid()
    }
  )

  adresse!: AdresseValidator
    setAdresse(validator: AdresseValidator) {
    this.adresse = validator
    this.nested("adresse", validator)
    return this
  }

  override validatorItems: ValidatorItem< any>[] = [
    this.email,
    this.password,
    this.code,
    this.nom,
    this.prenom,
    this.telephone,
    this.entreprise,
  ]

  override getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static override init(item: () => Employe): EmployeValidator {
    const validator = new EmployeValidator()
    validator.item = item
    return validator;
  }

}
