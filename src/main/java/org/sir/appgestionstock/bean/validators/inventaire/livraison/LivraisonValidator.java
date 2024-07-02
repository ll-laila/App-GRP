package org.sir.appgestionstock.bean.validators.inventaire.livraison;

import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class LivraisonValidator extends Validator<Livraison> {
    public LivraisonValidator(Livraison item) {
        super(item);
    }

    public static void validate(Livraison item) {
        new LivraisonValidator(item).validate();
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
    public ValidatorItem<LocalDate> dateCreation = new ValidatorItem<>(
            "dateCreation",
            () -> this.getItem().getDateCreation(),
            (LocalDate value) -> {
                this.dateCreation.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<LocalDate> dateExpedition = new ValidatorItem<>(
            "dateExpedition",
            () -> this.getItem().getDateExpedition(),
            (LocalDate value) -> {
                this.dateExpedition.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> remiseGlobal = new ValidatorItem<>(
            "remiseGlobal",
            () -> this.getItem().getRemiseGlobal(),
            (Double value) -> {
                this.remiseGlobal.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Integer> totalUnites = new ValidatorItem<>(
            "totalUnites",
            () -> this.getItem().getTotalUnites(),
            (Integer value) -> {
                this.totalUnites.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> sousTotal = new ValidatorItem<>(
            "sousTotal",
            () -> this.getItem().getSousTotal(),
            (Double value) -> {
                this.sousTotal.getValidators()
                        .required()
                        .valid();
            }
    );
    public ValidatorItem<Double> total = new ValidatorItem<>(
            "total",
            () -> this.getItem().getTotal(),
            (Double value) -> {
                this.total.getValidators()
                        .required()
                        .valid();
            }
    );

    @Override
    public List< ValidatorItem< ?>> validatorItems() {
        return List.of(
                this.code,
                this.dateCreation,
                this.dateExpedition,
                this.remiseGlobal,
                this.totalUnites,
                this.sousTotal,
                this.total
        );
    }
}
