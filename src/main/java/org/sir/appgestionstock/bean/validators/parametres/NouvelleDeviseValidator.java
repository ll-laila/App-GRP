package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class NouvelleDeviseValidator extends Validator<NouvelleDevise> {
    public NouvelleDeviseValidator(NouvelleDevise item) {
        super(item);
    }

    public static void validate(NouvelleDevise item) {
        new NouvelleDeviseValidator(item).validate();
    }

    public ValidatorItem<String> labelle = new ValidatorItem<>(
            "labelle",
            () -> this.getItem().getLabelle(),
            (String value) -> {
                this.labelle.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.labelle
        );
    }
}
