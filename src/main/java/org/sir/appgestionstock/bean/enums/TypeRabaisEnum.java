package org.sir.appgestionstock.bean.enums;
public enum TypeRabaisEnum {
POURCENTAGE("POURCENTAGE"),
MONTANT("MONTANT"),
;
private final String value;
TypeRabaisEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}