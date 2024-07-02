package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class TaxeValidator extends Validator<Taxe> {
    public TaxeValidator(Taxe item) {
        super(item);
    }

    public static void validate(Taxe item) {
        new TaxeValidator(item).validate();
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
    public ValidatorItem<Double> tauxImposition = new ValidatorItem<>(
            "tauxImposition",
            () -> this.getItem().getTauxImposition(),
            (Double value) -> {
                this.tauxImposition.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom,
                this.tauxImposition
        );
    }
}
