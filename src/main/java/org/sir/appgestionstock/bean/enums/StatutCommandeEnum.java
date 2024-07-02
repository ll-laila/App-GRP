package org.sir.appgestionstock.bean.enums;
public enum StatutCommandeEnum {
REGETE("REGETE"),
ACCEPTETRANSFORME("Accepte et Transforme"),
ENATTENTE("En attente"),
;
private final String value;
StatutCommandeEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}