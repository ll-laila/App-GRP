package org.sir.appgestionstock.bean.validators.ventes.retourproduit;

import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class RetourProduitValidator extends Validator<RetourProduit> {
    public RetourProduitValidator(RetourProduit item) {
        super(item);
    }

    public static void validate(RetourProduit item) {
        new RetourProduitValidator(item).validate();
    }

    public ValidatorItem<String> code = new ValidatorItem<>(
            "code",
            () -> this.getItem().getCode(),
            (String value) -> {
                this.code.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.code
        );
    }
}
