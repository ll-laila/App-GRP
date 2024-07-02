package org.sir.appgestionstock.bean.enums;
public enum StatutNoteCreditEnum {
CREDITE("CREDITE"),
;
private final String value;
StatutNoteCreditEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}