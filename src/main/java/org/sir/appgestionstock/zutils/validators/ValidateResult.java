package org.sir.appgestionstock.zutils.validators;

public class ValidateResult<T> {
    private String field;
    private T value;
    private boolean valid;
    private String message;

    public ValidateResult(String field, T value, boolean valid, String message) {
        this.field = field;
        this.value = value;
        this.valid = valid;
        this.message = message;
    }

    public static <T> ValidateResult<T> of(T value, String field, boolean valid, String message) {
        return new ValidateResult<>(field, value, valid, message);
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
