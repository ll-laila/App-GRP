package org.sir.appgestionstock.bean.validators.adresse;

import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class AdresseValidator extends Validator<Adresse> {
    public AdresseValidator(Adresse item) {
        super(item);
    }

    public static void validate(Adresse item) {
        new AdresseValidator(item).validate();
    }

    public ValidatorItem<String> address1 = new ValidatorItem<>(
            "address1",
            () -> this.getItem().getAddress1(),
            (String value) -> {
                this.address1.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> address2 = new ValidatorItem<>(
            "address2",
            () -> this.getItem().getAddress2(),
            (String value) -> {
                this.address2.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> postalCode = new ValidatorItem<>(
            "postalCode",
            () -> this.getItem().getPostalCode(),
            (String value) -> {
                this.postalCode.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> city = new ValidatorItem<>(
            "city",
            () -> this.getItem().getCity(),
            (String value) -> {
                this.city.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.address1,
                this.address2,
                this.postalCode,
                this.city
        );
    }
}
