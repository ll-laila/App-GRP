import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {RetourProduitProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit-produit";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {RetourProduit} from 'src/app/controller/entities/ventes/retourproduit/retour-produit';

export class RetourProduitProduitValidator extends Validator< RetourProduitProduit> {
  quantite = new ValidatorItem<number>(
    () => this.item().quantite,
    (value) => this.item().quantite = value || 0,
    (value) => {
      this.quantite.numberValidators
        ?.required()
        ?.valid()
    }
  )
  cout = new ValidatorItem<number>(
    () => this.item().cout,
    (value) => this.item().cout = value || 0,
    (value) => {
      this.cout.numberValidators
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
  retourProduit = new ValidatorItem<RetourProduit>(
    () => this.item().retourProduit,
    (value) => this.item().retourProduit = value,
    (value) => {
      this.retourProduit.validators
        ?.errorIf(value?.id == null, "No RetourProduit Was Provided!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.quantite,
    this.cout,
    this.produit,
    this.retourProduit,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => RetourProduitProduit): RetourProduitProduitValidator {
    const validator = new RetourProduitProduitValidator()
    validator.item = item
    return validator;
  }

}
