package org.sir.appgestionstock.bean.validators.inventaire.boncommande;

import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.zutils.validators.Validator;
import org.sir.appgestionstock.zutils.validators.ValidatorItem;

import java.time.*;
import java.util.List;

public class BonCommandeValidator extends Validator<BonCommande> {
    public BonCommandeValidator(BonCommande item) {
        super(item);
    }

    public static void validate(BonCommande item) {
        new BonCommandeValidator(item).validate();
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
    public ValidatorItem<Float> rabais = new ValidatorItem<>(
            "rabais",
            () -> this.getItem().getRabais(),
            (Float value) -> {
                this.rabais.getValidators()
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
                this.rabais,
                this.remiseGlobal,
                this.totalUnites,
                this.sousTotal,
                this.total
        );
    }
}
