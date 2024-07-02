package org.sir.appgestionstock.bean.validators.contacts.user;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class EmployeValidator extends Validator<Employe> {
    public EmployeValidator(Employe item) {
        super(item);
    }

    public static void validate(Employe item) {
        new EmployeValidator(item).validate();
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
    public ValidatorItem<String> nom = new ValidatorItem<>(
            "nom",
            () -> this.getItem().getNom(),
            (String value) -> {
                this.nom.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> prenom = new ValidatorItem<>(
            "prenom",
            () -> this.getItem().getPrenom(),
            (String value) -> {
                this.prenom.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> telephone = new ValidatorItem<>(
            "telephone",
            () -> this.getItem().getTelephone(),
            (String value) -> {
                this.telephone.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.code,
                this.nom,
                this.prenom,
                this.telephone
        );
    }
}
