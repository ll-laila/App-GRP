package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.ws.dto.parametres.NouvelleDeviseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class NouvelleDeviseConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setNouvelleDevises(value);
}
public final NouvelleDeviseDto toDto(NouvelleDevise item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final NouvelleDevise toItem(NouvelleDeviseDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<NouvelleDevise> toItem(List<NouvelleDeviseDto> dtos) {
if (dtos == null) return null;
List<NouvelleDevise> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<NouvelleDeviseDto> toDto(List<NouvelleDevise> items) {
if (items == null) return null;
List<NouvelleDeviseDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected NouvelleDevise convertToItem(NouvelleDeviseDto dto) {
var item = new NouvelleDevise();
item.setId(dto.getId());
item.setLabelle(dto.getLabelle());
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setIdEntreprise(dto.getIdEntreprise());
return item;
}
protected NouvelleDeviseDto convertToDto(NouvelleDevise item) {
var dto = new NouvelleDeviseDto();
dto.setId(item.getId());
dto.setLabelle(item.getLabelle());
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
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
}