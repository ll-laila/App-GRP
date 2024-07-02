package org.sir.appgestionstock.bean.validators.ventes.commande;

import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class CommandeProduitValidator extends Validator<CommandeProduit> {
    public CommandeProduitValidator(CommandeProduit item) {
        super(item);
    }

    public static void validate(CommandeProduit item) {
        new CommandeProduitValidator(item).validate();
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
