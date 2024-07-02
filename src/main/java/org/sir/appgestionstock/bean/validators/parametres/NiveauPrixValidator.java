package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class NiveauPrixValidator extends Validator<NiveauPrix> {
    public NiveauPrixValidator(NiveauPrix item) {
        super(item);
    }

    public static void validate(NiveauPrix item) {
        new NiveauPrixValidator(item).validate();
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
