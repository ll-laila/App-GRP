package org.sir.appgestionstock.bean.enums;
public enum StatutNiveauPrixEnum {
VENTE("VENTE"),
ACHAT("ACHAT"),
;
private final String value;
StatutNiveauPrixEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}