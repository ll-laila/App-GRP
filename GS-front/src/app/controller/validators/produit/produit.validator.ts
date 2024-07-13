import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {Produit} from "src/app/controller/entities/produit/produit";
import {Devises} from 'src/app/controller/entities/parametres/devises';
import {Taxe} from 'src/app/controller/entities/parametres/taxe';
import {Fournisseur} from 'src/app/controller/entities/contacts/fournisseur';
import {Entreprise} from 'src/app/controller/entities/parametres/entreprise';
import {NiveauStockValidator} from 'src/app/controller/validators/inventaire/niveau-stock.validator';

export class ProduitValidator extends Validator< Produit> {
  nom = new ValidatorItem<string>(
    () => this.item().nom,
    (value) => this.item().nom = value,
    (value) => {
      this.nom.stringValidators
        ?.required()
        ?.pattern(/^[a-zA-Z]+$/,'Nom invalide,Veuillez entrer un nom contenant uniquement des lettres alphabétiques')

        ?.valid()
    }
  )
  sku = new ValidatorItem<string>(
    () => this.item().sku,
    (value) => this.item().sku = value,
    (value) => {
      this.sku.stringValidators
        ?.required()
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
  barcode = new ValidatorItem<string>(
    () => this.item().barcode,
    (value) => this.item().barcode = value,
    (value) => {
      this.barcode.stringValidators
        ?.required()
        ?.valid()
    }
  )


  niveauStockInitial = new ValidatorItem<number>(
    () => this.item().niveauStockInitial,
    (value) => this.item().niveauStockInitial = value || 0,
    (value) => {
      this.niveauStockInitial.numberValidators
        ?.required()
        ?.valid()
    }
  )

  pointCommande = new ValidatorItem<number>(
    () => this.item().pointCommande,
    (value) => this.item().pointCommande = value  || 0,
    (value) => {
      this.pointCommande.numberValidators
        ?.required()
        ?.valid()
    }
  )
  prixGros = new ValidatorItem<number>(
    () => this.item().prixGros,
    (value) => this.item().prixGros = value  || 0,
    (value) => {
      this.prixGros.numberValidators
        ?.required()
        ?.valid()
    }
  )

  prixAchat = new ValidatorItem<number>(
    () => this.item().prixAchat,
    (value) => this.item().prixAchat = value || 0,
    (value) => {
      this.prixAchat.numberValidators
        ?.required()
        ?.valid()
    }
  )
  devises = new ValidatorItem<Devises>(
    () => this.item().devises,
    (value) => this.item().devises = value,
    (value) => {
      this.devises.validators
        ?.errorIf(value?.id == null, "No Devises Was Provided!")
        ?.valid()
    }
  )
  taxe = new ValidatorItem<Taxe>(
    () => this.item().taxe,
    (value) => this.item().taxe = value,
    (value) => {
      this.taxe.validators
        ?.errorIf(value?.id == null, "No Taxe Was Provided!")
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


 /* niveauStock!: NiveauStockValidator
    setNiveauStock(validator: NiveauStockValidator) {
    this.niveauStock = validator
    this.nested("niveauStock", validator)
    return this
  }*/

  override validatorItems: ValidatorItem< any>[] = [
    this.nom,
    this.sku,
    this.barcode,
    this.niveauStockInitial,
    this.pointCommande,
    this.prixGros,
  //  this.prixAchat,
    this.devises,
    this.taxe,
    this.fournisseur,
    this.entreprise,
  ]

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }

  static init(item: () => Produit): ProduitValidator {
    const validator = new ProduitValidator()
    validator.item = item
    return validator;
  }

}
