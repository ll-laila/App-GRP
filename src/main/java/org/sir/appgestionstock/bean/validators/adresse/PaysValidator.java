package org.sir.appgestionstock.bean.validators.adresse;

import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class PaysValidator extends Validator<Pays> {
    public PaysValidator(Pays item) {
        super(item);
    }

    public static void validate(Pays item) {
        new PaysValidator(item).validate();
    }

    public ValidatorItem<String> name = new ValidatorItem<>(
            "name",
            () -> this.getItem().getName(),
            (String value) -> {
                this.name.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.name
        );
    }
}
