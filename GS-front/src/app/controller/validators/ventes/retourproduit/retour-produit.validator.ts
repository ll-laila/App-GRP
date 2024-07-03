import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {Client} from 'src/app/controller/entities/contacts/client';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';

import {StatutRetourProduitEnum} from 'src/app/controller/enums/statut-retour-produit-enum'

export class RetourProduitValidator extends Validator< RetourProduit> {
  code = new ValidatorItem<string>(
    () => this.item().code,
    (value) => this.item().code = value,
    (value) => {
      this.code.stringValidators
        ?.required()
        ?.valid()
    }
  )
/*  statut = new ValidatorItem<StatutRetourProduitEnum>(
    () => this.item().statut,
    (value) => this.item().statut = value,
    (value) => {
      this.statut.validators
        ?.errorIf(value == null, "No Statut Was Provided!")
        ?.valid()
    }
  )*/
  client = new ValidatorItem<Client>(
    () => this.item().client,
    (value) => this.item().client = value,
    (value) => {
      this.client.validators
        ?.errorIf(value?.id == null, "Aucun Client n'a été fourni!")
        ?.valid()
    }
  )
 entreprise = new ValidatorItem<Entreprise>(
    () => this.item().entreprise,
    (value) => this.item().entreprise = value ,
    (value) => {
      this.entreprise.validators
        ?.errorIf(value?.id == null, "Aucun  Entreprise n'a été fourni!")
        ?.valid()
    }
  )


  override validatorItems: ValidatorItem< any>[] = [
    this.code,
  //  this.statut,
    this.client,
    this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => RetourProduit): RetourProduitValidator {
    const validator = new RetourProduitValidator()
    validator.item = item
    return validator;
  }

}
