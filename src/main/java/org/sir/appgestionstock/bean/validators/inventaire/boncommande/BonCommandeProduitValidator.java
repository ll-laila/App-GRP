package org.sir.appgestionstock.bean.validators.inventaire.boncommande;

import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class BonCommandeProduitValidator extends Validator<BonCommandeProduit> {
    public BonCommandeProduitValidator(BonCommandeProduit item) {
        super(item);
    }

    public static void validate(BonCommandeProduit item) {
        new BonCommandeProduitValidator(item).validate();
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
