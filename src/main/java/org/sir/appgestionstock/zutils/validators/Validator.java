package org.sir.appgestionstock.zutils.validators;

import org.sir.appgestionstock.exception.ValidatorException;
import java.util.ArrayList;
import java.util.List;

public abstract class Validator<T> {
    private T item;
    private List<Validator<?>> nestedValidators;
    private List<ValidateResult<?>> results;

    public Validator(T item) {
        this.item = item;
    }

    public boolean allGood() {
        return this.validatorItems().stream().allMatch(ValidatorItem::isValid);
    }

    public void applyAll() {
        this.validatorItems().forEach(ValidatorItem::validate);
    }

    public void reset() {
        this.validatorItems().forEach(ValidatorItem::reset);
    }

    public void validate() {
        this.applyAll();
        results = new ArrayList<>();
        this.validatorItems().forEach(it -> results.add(it.result()));
        if (this.nestedValidators != null) {
            this.nestedValidators.forEach(it -> {
                it.applyAll();
                it.validatorItems().forEach(item -> results.add(item.result()));
            });
        }
        if (results.stream().anyMatch(it -> !it.isValid())) {
            throw new ValidatorException(results);
        }
    }

    public List<ValidatorItem<?>> validatorItems() {
        return List.of();
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }

    public void setNestedValidators(List<Validator<?>> nestedValidators) {
        this.nestedValidators = nestedValidators;
    }

    public List<ValidateResult<?>> getResults() {
        return results;
    }
}
