package org.sir.appgestionstock.bean.enums;
public enum StatutCommandeExpeditionEnum {
ENATTENTE("En attente"),
EFFECTUERENVOI("Effectuer l'envoi"),
ENPREPARATION("En preparation"),
PRETPOUREXPEDITION("Pret pour expedition"),
EXPEDIE("EXPEDIE"),
LIVRE("LIVRE"),
;
private final String value;
StatutCommandeExpeditionEnum(String value) {
this.value = value;
}
public String value() {
return value;
}
}