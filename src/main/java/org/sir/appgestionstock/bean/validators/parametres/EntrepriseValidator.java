package org.sir.appgestionstock.bean.validators.parametres;

import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class EntrepriseValidator extends Validator<Entreprise> {
    public EntrepriseValidator(Entreprise item) {
        super(item);
    }

    public static void validate(Entreprise item) {
        new EntrepriseValidator(item).validate();
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
    public ValidatorItem<String> email = new ValidatorItem<>(
            "email",
            () -> this.getItem().getEmail(),
            (String value) -> {
                this.email.getValidators()
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
    public ValidatorItem<String> siteweb = new ValidatorItem<>(
            "siteweb",
            () -> this.getItem().getSiteweb(),
            (String value) -> {
                this.siteweb.getValidators()
                        .required()
                        .valid();
            }
    );
   // public ValidatorItem<String> logo = new ValidatorItem<>(
//            "logo",
//            () -> this.getItem().getLogo(),
//            (String value) -> {
//                this.logo.getValidators()
//                        .required()
//                        .valid();
//            }
//    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.nom,
                this.email,
                this.telephone,
                this.siteweb
//                this.logo
        );
    }
}
