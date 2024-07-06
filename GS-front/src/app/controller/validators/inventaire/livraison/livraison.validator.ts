import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Fournisseur} from 'src/app/controller/entities/contacts/fournisseur';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {StatutLivraisonEnum} from 'src/app/controller/enums/statut-livraison-enum'

export class LivraisonValidator extends Validator< Livraison> {
  code = new ValidatorItem<string>(
    () => this.item().code,
    (value) => this.item().code = value,
    (value) => {
      this.code.stringValidators
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
 /* remiseGlobal = new ValidatorItem<number>(
    () => this.item().remiseGlobal,
    (value) => this.item().remiseGlobal = value  || 0,
    (value) => {
      this.remiseGlobal.numberValidators
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
  total = new ValidatorItem<number>(
    () => this.item().total,
    (value) => this.item().total = value  || 0,
    (value) => {
      this.total.numberValidators
        ?.required()
        ?.valid()
    }
  )*/
 /* statut = new ValidatorItem<StatutLivraisonEnum>(
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
        ?.errorIf(value?.id == null, "No TaxeExpedition Was Provided!")
        ?.valid()
    }
  )
  fournisseur = new ValidatorItem<Fournisseur>(
    () => this.item().fournisseur,
    (value) => this.item().fournisseur = value,
    (value) => {
      this.fournisseur.validators
        ?.errorIf(value?.id == null, "No Fournisseur Was Provided!")
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

  override validatorItems: ValidatorItem< any>[] = [
    this.code,
    this.dateCreation,
    this.dateExpedition,
  /*  this.remiseGlobal,
    this.totalUnites,
    this.sousTotal,
    this.total,*/
 //   this.statut,
    this.taxeExpedition,
    this.fournisseur,
    this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Livraison): LivraisonValidator {
    const validator = new LivraisonValidator()
    validator.item = item
    return validator;
  }

}
