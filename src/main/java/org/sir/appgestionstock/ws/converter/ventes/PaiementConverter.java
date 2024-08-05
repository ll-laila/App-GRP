package org.sir.appgestionstock.ws.converter.ventes;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.ws.dto.ventes.PaiementDto;
import org.sir.appgestionstock.ws.converter.parametres.MethodePaiementConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class PaiementConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private MethodePaiementConverter methodePaiementConverter;
private boolean methodePaiement = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setPaiement(value);
}
public final PaiementDto toDto(Paiement item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Paiement toItem(PaiementDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Paiement> toItem(List<PaiementDto> dtos) {
if (dtos == null) return null;
List<Paiement> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<PaiementDto> toDto(List<Paiement> items) {
if (items == null) return null;
List<PaiementDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Paiement convertToItem(PaiementDto dto) {
var item = new Paiement();
item.setId(dto.getId());
item.setDatePaiement(dto.getDatePaiement());
item.setMontantPaye(dto.getMontantPaye());
item.setMontantRest(dto.getMontantRest());
item.setMethodePaiement(methodePaiementConverter.toItem(dto.getMethodePaiement()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setIdFacture(dto.getIdFacture());
item.setIdEntreprise(dto.getIdEntreprise());
return item;
}
protected PaiementDto convertToDto(Paiement item) {
var dto = new PaiementDto();
dto.setId(item.getId());
dto.setDatePaiement(item.getDatePaiement());
dto.setMontantPaye(item.getMontantPaye());
dto.setMontantRest(item.getMontantRest());
dto.setMethodePaiement(methodePaiement? methodePaiementConverter.toDto(item.getMethodePaiement()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setIdFacture(item.getIdFacture());
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
}
public void setMethodePaiement(boolean value) {
this.methodePaiement = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
}
public EntrepriseConverter getEntrepriseConverter() {
return entrepriseConverter;
}
public void setMethodePaiementConverter(MethodePaiementConverter value) {
this.methodePaiementConverter = value;
}
public MethodePaiementConverter getMethodePaiementConverter() {
return methodePaiementConverter;
}
}
