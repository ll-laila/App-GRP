package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class MethodePaiementValidator extends Validator<MethodePaiement> {
    public MethodePaiementValidator(MethodePaiement item) {
        super(item);
    }

    public static void validate(MethodePaiement item) {
        new MethodePaiementValidator(item).validate();
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

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom
        );
    }
}
