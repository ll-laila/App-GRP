import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {FactureProduit} from "src/app/controller/entities/ventes/facture/facture-produit";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {Facture} from 'src/app/controller/entities/ventes/facture/facture';

export class FactureProduitValidator extends Validator< FactureProduit> {
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
        ?.errorIf(value?.id == null, "Aucun  Produit n'a été fourni!")
        ?.valid()
    }
  )
  facture = new ValidatorItem<Facture>(
    () => this.item().facture,
    (value) => this.item().facture = value,
    (value) => {
      this.facture.validators
        ?.errorIf(value?.id == null, "Aucun  Facture n'a été fourni!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.total,
    this.quantite,
    this.disque,
    this.produit,
    this.facture,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => FactureProduit): FactureProduitValidator {
    const validator = new FactureProduitValidator()
    validator.item = item
    return validator;
  }

}
