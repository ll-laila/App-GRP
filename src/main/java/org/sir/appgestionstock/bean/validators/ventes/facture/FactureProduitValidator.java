package org.sir.appgestionstock.bean.validators.ventes.facture;

import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class FactureProduitValidator extends Validator<FactureProduit> {
    public FactureProduitValidator(FactureProduit item) {
        super(item);
    }

    public static void validate(FactureProduit item) {
        new FactureProduitValidator(item).validate();
    }

    public ValidatorItem<Double> total = new ValidatorItem<>(
            "total",
            () -> this.getItem().getTotal(),
            (Double value) -> {
                this.total.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Integer> quantite = new ValidatorItem<>(
            "quantite",
            () -> this.getItem().getQuantite(),
            (Integer value) -> {
                this.quantite.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> disque = new ValidatorItem<>(
            "disque",
            () -> this.getItem().getDisque(),
            (Double value) -> {
                this.disque.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.total,
                this.quantite,
                this.disque
        );
    }
}
