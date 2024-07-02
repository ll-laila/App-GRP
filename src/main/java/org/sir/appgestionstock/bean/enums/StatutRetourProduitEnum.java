package org.sir.appgestionstock.bean.enums;
public enum StatutRetourProduitEnum {
LIVRE("LIVRE"),
ENATTENTE("ENATTENTE"),
;
private final String value;
StatutRetourProduitEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}