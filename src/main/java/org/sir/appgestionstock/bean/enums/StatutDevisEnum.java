package org.sir.appgestionstock.bean.enums;
public enum StatutDevisEnum {
ACCEPTETRANSFORME("Accepte et Transforme"),
ENATTENTE("En attente"),
REGETE("REGETE"),
ACCEPTE("ACCEPTE"),
;
private final String value;
StatutDevisEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}