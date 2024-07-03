import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {BonCommandeProduit} from "src/app/controller/entities/inventaire/boncommande/bon-commande-produit";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {BonCommande} from 'src/app/controller/entities/inventaire/boncommande/bon-commande';

export class BonCommandeProduitValidator extends Validator< BonCommandeProduit> {
  total = new ValidatorItem<number>(
    () => this.item().total,
    (value) => this.item().total = value || 0,
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
    (value) => this.item().disque = value || 0,
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
  bonCommande = new ValidatorItem<BonCommande>(
    () => this.item().bonCommande,
    (value) => this.item().bonCommande = value,
    (value) => {
      this.bonCommande.validators
        ?.errorIf(value?.id == null, "No BonCommande Was Provided!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.total,
    this.quantite,
    this.disque,
    this.produit,
    this.bonCommande,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => BonCommandeProduit): BonCommandeProduitValidator {
    const validator = new BonCommandeProduitValidator()
    validator.item = item
    return validator;
  }

}
