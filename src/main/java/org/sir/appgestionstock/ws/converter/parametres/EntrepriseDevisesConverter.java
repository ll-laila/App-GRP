package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDevisesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class EntrepriseDevisesConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private DevisesConverter devisesConverter;
private boolean entreprise = true;
private boolean devises = true;
protected void configure(boolean value) {
this.entrepriseConverter.setEntrepriseDevises(value);
this.devisesConverter.setEntrepriseDevises(value);
}
public final EntrepriseDevisesDto toDto(EntrepriseDevises item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final EntrepriseDevises toItem(EntrepriseDevisesDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<EntrepriseDevises> toItem(List<EntrepriseDevisesDto> dtos) {
if (dtos == null) return null;
List<EntrepriseDevises> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<EntrepriseDevisesDto> toDto(List<EntrepriseDevises> items) {
if (items == null) return null;
List<EntrepriseDevisesDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected EntrepriseDevises convertToItem(EntrepriseDevisesDto dto) {
var item = new EntrepriseDevises();
item.setId(dto.getId());
item.setDefaut(dto.isDefaut());
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
return item;
}
protected EntrepriseDevisesDto convertToDto(EntrepriseDevises item) {
var dto = new EntrepriseDevisesDto();
dto.setId(item.getId());
dto.setDefaut(item.isDefaut());
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
return dto;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setDevises(boolean value) {
this.devises = value;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
}
public EntrepriseConverter getEntrepriseConverter() {
return entrepriseConverter;
}
public void setDevisesConverter(DevisesConverter value) {
this.devisesConverter = value;
}
public DevisesConverter getDevisesConverter() {
return devisesConverter;
}
}