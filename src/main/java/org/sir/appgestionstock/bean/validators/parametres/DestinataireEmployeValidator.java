package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class DestinataireEmployeValidator extends Validator<DestinataireEmploye> {
    public DestinataireEmployeValidator(DestinataireEmploye item) {
        super(item);
    }

    public static void validate(DestinataireEmploye item) {
        new DestinataireEmployeValidator(item).validate();
    }


    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
        );
    }
}
