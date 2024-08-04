package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.ws.dto.parametres.MethodePaiementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class MethodePaiementConverter {
protected void configure(boolean value) {
}
public final MethodePaiementDto toDto(MethodePaiement item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final MethodePaiement toItem(MethodePaiementDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<MethodePaiement> toItem(List<MethodePaiementDto> dtos) {
if (dtos == null) return null;
List<MethodePaiement> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<MethodePaiementDto> toDto(List<MethodePaiement> items) {
if (items == null) return null;
List<MethodePaiementDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected MethodePaiement convertToItem(MethodePaiementDto dto) {
var item = new MethodePaiement();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setDisponiblePos(dto.isDisponiblePos());
item.setActif(dto.isActif());
item.setIdEntreprise(item.getIdEntreprise());
return item;
}
protected MethodePaiementDto convertToDto(MethodePaiement item) {
var dto = new MethodePaiementDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setDisponiblePos(item.isDisponiblePos());
dto.setActif(item.isActif());
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
}



}