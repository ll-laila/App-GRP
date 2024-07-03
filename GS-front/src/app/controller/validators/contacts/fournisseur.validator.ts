import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {AdresseValidator} from 'src/app/controller/validators/adresse/adresse.validator';
import {LangueEnum} from 'src/app/controller/enums/langue-enum'

export class FournisseurValidator extends Validator< Fournisseur> {
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
  code = new ValidatorItem<string>(
    () => this.item().code,
    (value) => this.item().code = value,
    (value) => {
      this.code.stringValidators
        ?.required()
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
  entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "Aucune Entreprise n'a été fournie!")
        ?.valid()
    }
  )
  taxeNumero = new ValidatorItem<number>(
    () => this.item().taxeNumero,
    (value) => this.item().taxeNumero = value  || 0,
    (value) => {
      this.taxeNumero.numberValidators
        ?.required()
        ?.valid()
    }
  )
  rabais = new ValidatorItem<number>(
    () => this.item().rabais,
    (value) => this.item().rabais = value  || 0,
    (value) => {
      this.rabais.numberValidators
        ?.required()
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
  niveauPrix = new ValidatorItem<NiveauPrix>(
    () => this.item().niveauPrix,
    (value) => this.item().niveauPrix = value,
    (value) => {
      this.niveauPrix.validators
        ?.errorIf(value?.id == null, "No NiveauPrix Was Provided!")
        ?.valid()
    }
  )
  taxe = new ValidatorItem<Taxe>(
    () => this.item().taxe,
    (value) => this.item().taxe = value,
    (value) => {
      this.taxe.validators
        ?.errorIf(value?.id == null, "No Taxe Was Provided!")
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
    this.nom,
    this.code,
    this.email,
    this.siteweb,
    this.telephone,
    this.taxeNumero,
    this.entreprise,
    this.rabais,

    this.devises,
    this.niveauPrix,
    this.taxe,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Fournisseur): FournisseurValidator {
    const validator = new FournisseurValidator()
    validator.item = item
    return validator;
  }

}
