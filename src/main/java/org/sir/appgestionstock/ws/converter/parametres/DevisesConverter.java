package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.ws.dto.parametres.DevisesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class DevisesConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NouvelleDeviseConverter nouvelleDeviseConverter;
@Autowired private EntrepriseDevisesConverter entrepriseDevisesConverter;
private boolean nouvelleDevise = true;
private boolean entrepriseDevises = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setDevisesList(value);
this.entrepriseDevisesConverter.setDevises(value);
}
public final DevisesDto toDto(Devises item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Devises toItem(DevisesDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Devises> toItem(List<DevisesDto> dtos) {
if (dtos == null) return null;
List<Devises> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<DevisesDto> toDto(List<Devises> items) {
if (items == null) return null;
List<DevisesDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Devises convertToItem(DevisesDto dto) {
var item = new Devises();
item.setId(dto.getId());
item.setTauxDeChange(dto.getTauxDeChange());
item.setNouvelleDevise(nouvelleDeviseConverter.toItem(dto.getNouvelleDevise()));
item.setEntrepriseDevises(entrepriseDevisesConverter.toItem(dto.getEntrepriseDevises()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setIdEntreprise(dto.getIdEntreprise());
return item;
}
protected DevisesDto convertToDto(Devises item) {
var dto = new DevisesDto();
dto.setId(item.getId());
dto.setTauxDeChange(item.getTauxDeChange());
dto.setNouvelleDevise(nouvelleDevise? nouvelleDeviseConverter.toDto(item.getNouvelleDevise()): null);
dto.setEntrepriseDevises(entrepriseDevises? entrepriseDevisesConverter.toDto(item.getEntrepriseDevises()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
}
public void setNouvelleDevise(boolean value) {
this.nouvelleDevise = value;
}
public void setEntrepriseDevises(boolean value) {
this.entrepriseDevises = value;
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
public void setNouvelleDeviseConverter(NouvelleDeviseConverter value) {
this.nouvelleDeviseConverter = value;
}
public NouvelleDeviseConverter getNouvelleDeviseConverter() {
return nouvelleDeviseConverter;
}
public void setEntrepriseDevisesConverter(EntrepriseDevisesConverter value) {
this.entrepriseDevisesConverter = value;
}
public EntrepriseDevisesConverter getEntrepriseDevisesConverter() {
return entrepriseDevisesConverter;
}
}