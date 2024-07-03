import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {CommandeProduit} from "src/app/controller/entities/ventes/commande/commande-produit";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {Commande} from 'src/app/controller/entities/ventes/commande/commande';

export class CommandeProduitValidator extends Validator< CommandeProduit> {
  total = new ValidatorItem<number>(
    () => this.item().total,
    (value) => this.item().total = value  || 0,
    (value) => {
      this.total.numberValidators
        ?.required()
        ?.valid()
    }
  )
  quantite = new ValidatorItem<number>(
    () => this.item().quantite,
    (value) => this.item().quantite = value  || 0,
    (value) => {
      this.quantite.numberValidators
        ?.required()
        ?.valid()
    }
  )
  disque = new ValidatorItem<number>(
    () => this.item().disque,
    (value) => this.item().disque = value  || 0,
    (value) => {
      this.disque.numberValidators
        ?.required()
        ?.valid()
    }
  )
  produit = new ValidatorItem<Produit>(
    () => this.item().produit,
    (value) => this.item().produit = value,
    (value) => {
      this.produit.validators
        ?.errorIf(value?.id == null, "No Produit Was Provided!")
        ?.valid()
    }
  )
  commande = new ValidatorItem<Commande>(
    () => this.item().commande,
    (value) => this.item().commande = value,
    (value) => {
      this.commande.validators
        ?.errorIf(value?.id == null, "No Commande Was Provided!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.total,
    this.quantite,
    this.disque,
    this.produit,
    this.commande,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => CommandeProduit): CommandeProduitValidator {
    const validator = new CommandeProduitValidator()
    validator.item = item
    return validator;
  }

}
