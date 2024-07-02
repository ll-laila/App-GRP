package org.sir.appgestionstock.bean.validators.ventes.retourproduit;

import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class RetourProduitProduitValidator extends Validator<RetourProduitProduit> {
    public RetourProduitProduitValidator(RetourProduitProduit item) {
        super(item);
    }

    public static void validate(RetourProduitProduit item) {
        new RetourProduitProduitValidator(item).validate();
    }

    public ValidatorItem<Integer> quantite = new ValidatorItem<>(
            "quantite",
            () -> this.getItem().getQuantite(),
            (Integer value) -> {
                this.quantite.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Float> cout = new ValidatorItem<>(
            "cout",
            () -> this.getItem().getCout(),
            (Float value) -> {
                this.cout.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.quantite,
                this.cout
        );
    }
}
