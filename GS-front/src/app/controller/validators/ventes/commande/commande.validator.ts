import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Client} from 'src/app/controller/entities/contacts/client';
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {FactureValidator} from 'src/app/controller/validators/ventes/facture/facture.validator';
import {AdresseValidator} from 'src/app/controller/validators/adresse/adresse.validator';
import {TypeRabaisEnum} from 'src/app/controller/enums/type-rabais-enum'
import {StatutCommandeEnum} from 'src/app/controller/enums/statut-commande-enum'

export class CommandeValidator extends Validator< Commande> {
  code = new ValidatorItem<string>(
    () => this.item().code,
    (value) => this.item().code = value,
    (value) => {
      this.code.stringValidators
        ?.required()
        ?.valid()
    }
  )
  dateExperation = new ValidatorItem<Date>(
    () => this.item().dateExperation,
    (value) => this.item().dateExperation = value,
    (value) => {
      this.dateExperation.validators
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

  totalUnites = new ValidatorItem<number>(
    () => this.item().totalUnites,
    (value) => this.item().totalUnites = value  || 0,
    (value) => {
      this.totalUnites.numberValidators
        ?.required()
        ?.valid()
    }
  )
  sousTotal = new ValidatorItem<number>(
    () => this.item().sousTotal,
    (value) => this.item().sousTotal = value  || 0,
    (value) => {
      this.sousTotal.numberValidators
        ?.required()
        ?.valid()
    }
  )
  remiseGlobal = new ValidatorItem<number>(
    () => this.item().remiseGlobal,
    (value) => this.item().remiseGlobal = value  || 0,
    (value) => {
      this.total.numberValidators
        ?.required()
        ?.valid()
    }
  )
  total = new ValidatorItem<number>(
    () => this.item().total,
    (value) => this.item().total = value  || 0,
    (value) => {
      this.total.numberValidators
        ?.required()
        ?.valid()
    }
  )
  typeRabais = new ValidatorItem<TypeRabaisEnum>(
    () => this.item().typeRabais,
    (value) => this.item().typeRabais = value,
    (value) => {
      this.typeRabais.validators
        ?.errorIf(value == null, "Aucun TypeRabais n' été fourni!")
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
 /* statut = new ValidatorItem<StatutCommandeEnum>(
    () => this.item().statut,
    (value) => this.item().statut = value,
    (value) => {
      this.statut.validators
        ?.errorIf(value == null, "No Statut Was Provided!")
        ?.valid()
    }
  )*/
  taxeExpedition = new ValidatorItem<Taxe>(
    () => this.item().taxeExpedition,
    (value) => this.item().taxeExpedition = value,
    (value) => {
      this.taxeExpedition.validators
        ?.errorIf(value?.id == null, "Aucun TaxeExpedition n'a été fourni!")
        ?.valid()
    }
  )
  taxe = new ValidatorItem<Taxe>(
    () => this.item().taxe,
    (value) => this.item().taxe = value,
    (value) => {
      this.taxe.validators
        ?.errorIf(value?.id == null, "Aucun TaxeExpedition n'a été fourni!")
        ?.valid()
    }
  )
  client = new ValidatorItem<Client>(
    () => this.item().client,
    (value) => this.item().client = value,
    (value) => {
      this.client.validators
        ?.errorIf(value?.id == null, "Aucun Client n'a été fourni!")
        ?.valid()
    }
  )
  devises = new ValidatorItem<Devises>(
    () => this.item().devises,
    (value) => this.item().devises = value,
    (value) => {
      this.devises.validators
        ?.errorIf(value?.id == null, "Aucun Devises n'a été fourni!")
        ?.valid()
    }
  )

/*
  facture!: FactureValidator
    setFacture(validator: FactureValidator) {
    this.facture = validator
    this.nested("facture", validator)
    return this
  }
  addressFacturation!: AdresseValidator
    setAddressFacturation(validator: AdresseValidator) {
    this.addressFacturation = validator
    this.nested("addressFacturation", validator)
    return this
  }
  addressExpedition!: AdresseValidator
    setAddressExpedition(validator: AdresseValidator) {
    this.addressExpedition = validator
    this.nested("addressExpedition", validator)
    return this
  }
*/
  override validatorItems: ValidatorItem< any>[] = [
    this.code,
    this.totalUnites,
    this.client,
    this.dateExperation,
    this.rabais,

    this.sousTotal,
    this.total,
    this.typeRabais,
   // this.statut,
    this.taxe,
    this.taxeExpedition,
    this.entreprise,

    this.devises,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Commande): CommandeValidator {
    const validator = new CommandeValidator()
    validator.item = item
    return validator;
  }

}
