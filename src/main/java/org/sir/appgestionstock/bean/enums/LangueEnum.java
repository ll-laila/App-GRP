package org.sir.appgestionstock.bean.enums;
public enum LangueEnum {
FRANCAIS("FRANCAIS"),
ANGLAIS("ANGLAIS"),
;
private final String value;
LangueEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}