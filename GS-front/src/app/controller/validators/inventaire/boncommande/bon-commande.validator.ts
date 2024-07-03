import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Fournisseur} from 'src/app/controller/entities/contacts/fournisseur';
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {LivraisonValidator} from 'src/app/controller/validators/inventaire/livraison/livraison.validator';
import {TypeRabaisEnum} from 'src/app/controller/enums/type-rabais-enum'
import {StatutBonCommandeEnum} from 'src/app/controller/enums/statut-bon-commande-enum'

export class BonCommandeValidator extends Validator< BonCommande> {
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
  rabais = new ValidatorItem<number>(
    () => this.item().rabais,
    (value) => this.item().rabais = value  || 0,
    (value) => {
      this.rabais.numberValidators
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
  )
  typeRabais = new ValidatorItem<TypeRabaisEnum>(
    () => this.item().typeRabais,
    (value) => this.item().typeRabais = value,
    (value) => {
      this.typeRabais.validators
        ?.errorIf(value == null, "Aucun Type de rabais n'a été fourni!")
        ?.valid()
    }
  )
 /* statut = new ValidatorItem<StatutBonCommandeEnum>(
    () => this.item().statut,
    (value) => this.item().statut = value,
    (value) => {
      this.statut.validators
        ?.errorIf(value == null, "No Statut Was Provided!")
        ?.valid()
    }
  )*/
  taxe = new ValidatorItem<Taxe>(
    () => this.item().taxe,
    (value) => this.item().taxe = value,
    (value) => {
      this.taxe.validators
        ?.errorIf(value?.id == null, "Aucun Taxe n'a été fourni!")
        ?.valid()
    }
  )
  taxeExpedition = new ValidatorItem<Taxe>(
    () => this.item().taxeExpedition,
    (value) => this.item().taxeExpedition = value,
    (value) => {
      this.taxeExpedition.validators
        ?.errorIf(value?.id == null, "Aucun TaxeExpedition n'a été fourni!")
        ?.valid()
    }
  )
  fournisseur = new ValidatorItem<Fournisseur>(
    () => this.item().fournisseur,
    (value) => this.item().fournisseur = value,
    (value) => {
      this.fournisseur.validators
        ?.errorIf(value?.id == null, "Aucun Fournisseur n'a été fourni!")
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
  entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "Aucune Entreprise n'a été fournie!")
        ?.valid()
    }
  )


  override validatorItems: ValidatorItem< any>[] = [
    this.code,
    this.dateCreation,
    this.dateExpedition,
    this.rabais,
    this.remiseGlobal,
    this.totalUnites,
    this.sousTotal,
    this.total,
    this.typeRabais,
  //  this.statut,
    this.taxe,
    this.taxeExpedition,
    this.fournisseur,
    this.devises,
   this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => BonCommande): BonCommandeValidator {
    const validator = new BonCommandeValidator()
    validator.item = item
    return validator;
  }

}
