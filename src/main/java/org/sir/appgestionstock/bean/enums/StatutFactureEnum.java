package org.sir.appgestionstock.bean.enums;
public enum StatutFactureEnum {
PAYE("PAYE"),
NONPAYE("Non paye"),
PARTIEL("PARTIEL"),
;
private final String value;
StatutFactureEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}