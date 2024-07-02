package org.sir.appgestionstock.bean.enums;
public enum StatutAlerteEnum {
SOUSLEPOINTCECOMMANDE("Sous le point de commande"),
ENRUPTUREDESTOCK("En rupture de stock"),
;
private final String value;
StatutAlerteEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}