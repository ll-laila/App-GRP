import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {LivraisonProduit} from "src/app/controller/entities/inventaire/livraison/livraison-produit";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {Livraison} from 'src/app/controller/entities/inventaire/livraison/livraison';

export class LivraisonProduitValidator extends Validator< LivraisonProduit> {
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
/*  livraison = new ValidatorItem<Livraison>(
    () => this.item().livraison,
    (value) => this.item().livraison = value,
    (value) => {
      this.livraison.validators
        ?.errorIf(value?.id == null, "No Livraison Was Provided!")
        ?.valid()
    }
  )*/

  override validatorItems: ValidatorItem< any>[] = [
    this.total,
    this.quantite,
    this.disque,
    this.produit,
   // this.livraison,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => LivraisonProduit): LivraisonProduitValidator {
    const validator = new LivraisonProduitValidator()
    validator.item = item
    return validator;
  }

}
