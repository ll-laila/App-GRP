package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class EntrepriseDevisesValidator extends Validator<EntrepriseDevises> {
    public EntrepriseDevisesValidator(EntrepriseDevises item) {
        super(item);
    }

    public static void validate(EntrepriseDevises item) {
        new EntrepriseDevisesValidator(item).validate();
    }


    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
        );
    }
}
