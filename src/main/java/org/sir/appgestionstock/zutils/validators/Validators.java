package org.sir.appgestionstock.zutils.validators;

import static org.sir.appgestionstock.zutils.validators.ValidatorUtils.EMAIL_PATTERN;
import static org.sir.appgestionstock.zutils.validators.ValidatorUtils.PHONE_PATTERN;

public class Validators<T> {
    public Validators(ValidatorItem<T> validatorItem) {
        this.validatorItem = validatorItem;
    }

    private final ValidatorItem<T> validatorItem;

    private T value() {
        return this.validatorItem.getField().get();
    }

    private void error(String msg) {
        this.validatorItem.error(msg);
    }

    public void valid() {
        this.validatorItem.setValid(true);
    }

    // Validate Methods
    public Validators<T> start() {
        this.validatorItem.reset();
        return this;
    }

    public Validators<T> required() {
        return apply(this.value() == null, "This field is required!");
    }

    public Validators<T> notEmptyString() {
        if (this.value() instanceof String value)
            return apply(!value.isEmpty(), "This field must not be empty!");
        return this;
    }

    public Validators<T> notBlankString() {
        if (this.value() instanceof String value)
            return apply(value.isBlank(), "This field must not be empty!");
        return this;
    }

    public Validators<T> maxLength(int max) {
        if (this.value() instanceof String value)
            return apply(value.length() > max, "Max Length is: " + max);
        return this;
    }

    public Validators<T> minLength(int min) {
        if (this.value() instanceof String value)
            return apply(value.length() < min, "Min Length is: " + min);
        return this;
    }

    public Validators<T> email() {
        return this.pattern(EMAIL_PATTERN, "Invalid email address!");
    }

    public Validators<T> phone() {
        return this.pattern(PHONE_PATTERN, "Invalid phone number!");
    }

    ////////////////
    public Validators<T> positive() {
        if (this.value() instanceof Integer value)
            return apply(value < 0, "This field must have a positive value!");
        return this;
    }

    public Validators<T> negative() {
        if (this.value() instanceof Integer value)
            return apply(value > 0, "This field must have a negative value!");
        return this;
    }

    /////////////////
    public Validators<T> pattern(String pattern, String errorMsg) {
        if (this.value() instanceof String value)
            return apply(!value.matches(pattern), errorMsg);
        return this;
    }

    public Validators<T> apply(boolean errorCondition, String errorMsg) {
        if (errorCondition) {
            this.error(errorMsg);
            throw new RuntimeException();
        }
        return this;
    }
}
