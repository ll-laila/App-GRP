package org.sir.appgestionstock.bean.validators.inventaire;

import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class NiveauStockValidator extends Validator<NiveauStock> {
    public NiveauStockValidator(NiveauStock item) {
        super(item);
    }

    public static void validate(NiveauStock item) {
        new NiveauStockValidator(item).validate();
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
    public ValidatorItem<String> disponible = new ValidatorItem<>(
            "disponible",
            () -> this.getItem().getDisponible(),
            (String value) -> {
                this.disponible.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom,
                this.sku,
                this.disponible
        );
    }
}
