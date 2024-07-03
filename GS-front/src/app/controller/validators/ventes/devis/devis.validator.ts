import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Devis} from "src/app/controller/entities/ventes/devis/devis";
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Client} from 'src/app/controller/entities/contacts/client';
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {PaiementValidator} from 'src/app/controller/validators/ventes/paiement.validator';
import {RetourProduitValidator} from 'src/app/controller/validators/ventes/retourproduit/retour-produit.validator';
import {TypeRabaisEnum} from 'src/app/controller/enums/type-rabais-enum'
import {StatutDevisEnum} from 'src/app/controller/enums/statut-devis-enum'

export class DevisValidator extends Validator< Devis> {
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
  dateCreation = new ValidatorItem<Date>(
    () => this.item().dateCreation,
    (value) => this.item().dateCreation = value,
    (value) => {
      this.dateCreation.validators
        ?.required()
        ?.valid()
    }
  )
  dateExpedition = new ValidatorItem<Date>(
    () => this.item().dateExpedition,
    (value) => this.item().dateExpedition = value,
    (value) => {
      this.dateExpedition.validators
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
  remiseGlobal = new ValidatorItem<number>(
    () => this.item().remiseGlobal,
    (value) => this.item().remiseGlobal = value  || 0,
    (value) => {
      this.remiseGlobal.numberValidators
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
        ?.errorIf(value == null, "Aucun TypeRabais n'a été fourni!")
        ?.valid()
    }
  )
 /* statut = new ValidatorItem<StatutDevisEnum>(
    () => this.item().statut,
    (value) => this.item().statut = value,
    (value) => {
      this.statut.validators
        ?.errorIf(value == null, "No Statut Was Provided!")
        ?.valid()
    }
  )*/
  entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "Aucune Entreprise n'a été fournie!")
        ?.valid()
    }
  )
  taxe = new ValidatorItem<Taxe>(
    () => this.item().taxe,
    (value) => this.item().taxe = value,
    (value) => {
      this.taxe.validators
        ?.errorIf(value?.id == null, "Aucun  Taxe n'a été fourni!")
        ?.valid()
    }
  )
  taxeExpedition = new ValidatorItem<Taxe>(
    () => this.item().taxeExpedition,
    (value) => this.item().taxeExpedition = value,
    (value) => {
      this.taxeExpedition.validators
        ?.errorIf(value?.id == null, "Aucun  TaxeExpedition n'a été fourni!")
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
        ?.errorIf(value?.id == null, "Aucun  Devises n'a été fourni!")
        ?.valid()
    }
  )

/*
  paiement!: PaiementValidator
    setPaiement(validator: PaiementValidator) {
    this.paiement = validator
    this.nested("paiement", validator)
    return this
  }
  retourProduit!: RetourProduitValidator
    setRetourProduit(validator: RetourProduitValidator) {
    this.retourProduit = validator
    this.nested("retourProduit", validator)
    return this
  }
*/
  override validatorItems: ValidatorItem< any>[] = [
    this.code,
    this.dateExperation,
    this.dateCreation,
    this.dateExpedition,
    this.rabais,
    this.totalUnites,
    this.remiseGlobal,
    this.sousTotal,
    this.total,
    this.typeRabais,
  //  this.statut,
    this.taxe,
    this.taxeExpedition,
    this.client,
    this.devises,
    this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Devis): DevisValidator {
    const validator = new DevisValidator()
    validator.item = item
    return validator;
  }

}
