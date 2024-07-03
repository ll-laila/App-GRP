import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {AdresseValidator} from 'src/app/controller/validators/adresse/adresse.validator';

export class EntrepriseValidator extends Validator< Entreprise> {
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
  email = new ValidatorItem<string>(
    () => this.item().email,
    (value) => this.item().email = value,
    (value) => {
      this.email.stringValidators
        ?.required()
        ?.pattern( /^[a-zA-Z0-9._%+-]+@gmail\.com$/,'Email invalide,Veuillez entrer un email sous la forme exemple@gmail.com')
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
  siteweb = new ValidatorItem<string>(
    () => this.item().siteweb,
    (value) => this.item().siteweb = value,
    (value) => {
      this.siteweb.stringValidators
        ?.required()
        ?.pattern(/^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/, 'Site web invalide. Veuillez entrer un site web sous la forme : http://www.exemple.com')
        ?.valid()
    }
  )
 /* logo = new ValidatorItem<string>(
    () => this.item().logo,
    (value) => this.item().logo = value,
    (value) => {
      this.logo.stringValidators
        ?.required()
        ?.valid()
    }
  )*/
  adresse!: AdresseValidator
    setAdresse(validator: AdresseValidator) {
    this.adresse = validator
    this.nested("adresse", validator)
    return this
  }

  override validatorItems: ValidatorItem< any>[] = [
    this.nom,
    this.email,
    this.telephone,
    this.siteweb,
    //this.logo,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Entreprise): EntrepriseValidator {
    const validator = new EntrepriseValidator()
    validator.item = item
    return validator;
  }

}
