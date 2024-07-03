import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {ProduitNiveauPrix} from "src/app/controller/entities/produit/produit-niveau-prix";
import {Produit} from 'src/app/controller/entities/produit/produit';
import {NiveauPrix} from 'src/app/controller/entities/parametres/niveau-prix';

export class ProduitNiveauPrixValidator extends Validator< ProduitNiveauPrix> {
  prix = new ValidatorItem<number>(
    () => this.item().prix,
    (value) => this.item().prix = value  || 0,
    (value) => {
      this.prix.numberValidators
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
  niveauPrix = new ValidatorItem<NiveauPrix>(
    () => this.item().niveauPrix,
    (value) => this.item().niveauPrix = value,
    (value) => {
      this.niveauPrix.validators
        ?.errorIf(value?.id == null, "No NiveauPrix Was Provided!")
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.prix,
    this.produit,
    this.niveauPrix,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => ProduitNiveauPrix): ProduitNiveauPrixValidator {
    const validator = new ProduitNiveauPrixValidator()
    validator.item = item
    return validator;
  }

}
