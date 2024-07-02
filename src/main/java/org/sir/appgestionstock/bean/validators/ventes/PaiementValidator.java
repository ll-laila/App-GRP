package org.sir.appgestionstock.bean.validators.ventes;

import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class PaiementValidator extends Validator<Paiement> {
    public PaiementValidator(Paiement item) {
        super(item);
    }

    public static void validate(Paiement item) {
        new PaiementValidator(item).validate();
    }

    public ValidatorItem<LocalDate> datePaiement = new ValidatorItem<>(
            "datePaiement",
            () -> this.getItem().getDatePaiement(),
            (LocalDate value) -> {
                this.datePaiement.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> montantPaye = new ValidatorItem<>(
            "montantPaye",
            () -> this.getItem().getMontantPaye(),
            (Double value) -> {
                this.montantPaye.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.datePaiement,
                this.montantPaye
        );
    }
}
