package org.sir.appgestionstock.bean.enums;
public enum StatutRemboursementEnum {
REMBOURSE("REMBOURSE"),
;
private final String value;
StatutRemboursementEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}