package org.sir.appgestionstock.bean.enums;
public enum StatutEstimationEnum {
REGETE("REGETE"),
ACCEPTETRANSFORME("Accepte et Transforme"),
ENATTENTE("En attente"),
;
private final String value;
StatutEstimationEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}