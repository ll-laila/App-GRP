package org.sir.appgestionstock.bean.validators.produit;

import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class ProduitValidator extends Validator<Produit> {
    public ProduitValidator(Produit item) {
        super(item);
    }

    public static void validate(Produit item) {
        new ProduitValidator(item).validate();
    }

    public ValidatorItem<String> nom = new ValidatorItem<>(
            "nom",
            () -> this.getItem().getNom(),
            (String value) -> {
                this.nom.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> sku = new ValidatorItem<>(
            "sku",
            () -> this.getItem().getSku(),
            (String value) -> {
                this.sku.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> barcode = new ValidatorItem<>(
            "barcode",
            () -> this.getItem().getBarcode(),
            (String value) -> {
                this.barcode.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> coutInitial = new ValidatorItem<>(
            "coutInitial",
            () -> this.getItem().getCoutInitial(),
            (Double value) -> {
                this.coutInitial.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Integer> quantiteMinimumCommandeClient = new ValidatorItem<>(
            "quantiteMinimumCommandeClient",
            () -> this.getItem().getQuantiteMinimumCommandeClient(),
            (Integer value) -> {
                this.quantiteMinimumCommandeClient.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Integer> niveauStockInitial = new ValidatorItem<>(
            "niveauStockInitial",
            () -> this.getItem().getNiveauStockInitial(),
            (Integer value) -> {
                this.niveauStockInitial.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> emplacementDeBac = new ValidatorItem<>(
            "emplacementDeBac",
            () -> this.getItem().getEmplacementDeBac(),
            (String value) -> {
                this.emplacementDeBac.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Integer> pointCommande = new ValidatorItem<>(
            "pointCommande",
            () -> this.getItem().getPointCommande(),
            (Integer value) -> {
                this.pointCommande.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> prixGros = new ValidatorItem<>(
            "prixGros",
            () -> this.getItem().getPrixGros(),
            (Double value) -> {
                this.prixGros.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> prixDetailRecommande = new ValidatorItem<>(
            "prixDetailRecommande",
            () -> this.getItem().getPrixDetailRecommande(),
            (Double value) -> {
                this.prixDetailRecommande.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> prixAchat = new ValidatorItem<>(
            "prixAchat",
            () -> this.getItem().getPrixAchat(),
            (Double value) -> {
                this.prixAchat.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom,
                this.sku,
                this.barcode,
                this.coutInitial,
                this.quantiteMinimumCommandeClient,
                this.niveauStockInitial,
                this.emplacementDeBac,
                this.pointCommande,
                this.prixGros,
                this.prixDetailRecommande,
                this.prixAchat
        );
    }
}
