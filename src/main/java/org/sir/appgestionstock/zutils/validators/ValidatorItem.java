package org.sir.appgestionstock.zutils.validators;

import java.util.function.Consumer;
import java.util.function.Supplier;

public class ValidatorItem<T> {
    public ValidatorItem(String fieldName, Supplier<T> field, Consumer<T> validation) {
        this.fieldName = fieldName;
        this.field = field;
        this.validations = validation;
    }

    private boolean valid;
    private String message;
    private final Supplier<T> field;
    private final String fieldName;
    private final Validators<T> validators = new Validators<>(this);
    private final Consumer<T> validations;

    public void validate() {
        try {
            this.validations.accept(this.field.get());
        } catch (RuntimeException ignored) {
        }
    }

    public void reset() {
        this.valid = false;
        this.message = null;
    }

    public void error(String msg) {
        this.valid = false;
        this.message = msg;
    }

    public ValidateResult<T> result() {
        return result(null);
    }

    public ValidateResult<T> result(String prefix) {
        var fieldname = (prefix != null ? prefix + "." : "") + fieldName;
        return ValidateResult.of(field.get(), fieldname, valid, message);
    }

    // GETTERS AND SETTERS
    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
        this.message = null;
    }

    public Supplier<T> getField() {
        return field;
    }

    public Validators<T> getValidators() {
        return validators;
    }
}
