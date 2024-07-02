package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class DevisesValidator extends Validator<Devises> {
    public DevisesValidator(Devises item) {
        super(item);
    }

    public static void validate(Devises item) {
        new DevisesValidator(item).validate();
    }

    public ValidatorItem<Double> tauxDeChange = new ValidatorItem<>(
            "tauxDeChange",
            () -> this.getItem().getTauxDeChange(),
            (Double value) -> {
                this.tauxDeChange.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.tauxDeChange
        );
    }
}
