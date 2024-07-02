package org.sir.appgestionstock.bean.validators.produit;

import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class ProduitNiveauPrixValidator extends Validator<ProduitNiveauPrix> {
    public ProduitNiveauPrixValidator(ProduitNiveauPrix item) {
        super(item);
    }

    public static void validate(ProduitNiveauPrix item) {
        new ProduitNiveauPrixValidator(item).validate();
    }

    public ValidatorItem<Double> prix = new ValidatorItem<>(
            "prix",
            () -> this.getItem().getPrix(),
            (Double value) -> {
                this.prix.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.prix
        );
    }
}
