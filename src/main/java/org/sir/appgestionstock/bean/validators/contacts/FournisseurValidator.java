package org.sir.appgestionstock.bean.validators.contacts;

import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class FournisseurValidator extends Validator<Fournisseur> {
    public FournisseurValidator(Fournisseur item) {
        super(item);
    }

    public static void validate(Fournisseur item) {
        new FournisseurValidator(item).validate();
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
    public ValidatorItem<String> code = new ValidatorItem<>(
            "code",
            () -> this.getItem().getCode(),
            (String value) -> {
                this.code.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> email = new ValidatorItem<>(
            "email",
            () -> this.getItem().getEmail(),
            (String value) -> {
                this.email.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<String> siteweb = new ValidatorItem<>(
            "siteweb",
            () -> this.getItem().getSiteweb(),
            (String value) -> {
                this.siteweb.getValidators()
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
    public ValidatorItem<Integer> taxeNumero = new ValidatorItem<>(
            "taxeNumero",
            () -> this.getItem().getTaxeNumero(),
            (Integer value) -> {
                this.taxeNumero.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Float> rabais = new ValidatorItem<>(
            "rabais",
            () -> this.getItem().getRabais(),
            (Float value) -> {
                this.rabais.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom,
                this.code,
                this.email,
                this.siteweb,
                this.telephone,
                this.taxeNumero,
                this.rabais
        );
    }
}
