package org.sir.appgestionstock.ws.converter.contacts.user;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.ws.dto.contacts.user.EmployeDto;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.parametres.DestinataireEmployeConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeConverter {
@Autowired private AppUserConverter appUserConverter;
@Autowired private AdresseConverter adresseConverter;
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private DestinataireEmployeConverter destinataireEmployeConverter;
@Autowired private PermissionsAccesConverter permissionsAccesConverter;
private boolean adresse = true;
private boolean destinataireEmploye = true;
private boolean entreprise = true;
private boolean permissionsAcces = true;

protected void configure(boolean value) {
this.entrepriseConverter.setEmployes(value);
this.destinataireEmployeConverter.setEmploye(value);
}
public final EmployeDto toDto(Employe item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Employe toItem(EmployeDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Employe> toItem(List<EmployeDto> dtos) {
if (dtos == null) return null;
List<Employe> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<EmployeDto> toDto(List<Employe> items) {
if (items == null) return null;
List<EmployeDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Employe convertToItem(EmployeDto dto) {
var item = new Employe();
appUserConverter.convertToChildItem(dto, item);
item.setCode(dto.getCode());
item.setNom(dto.getNom());
item.setPrenom(dto.getPrenom());
item.setTelephone(dto.getTelephone());
item.setAdresse(adresseConverter.toItem(dto.getAdresse()));
item.setDestinataireEmploye(destinataireEmployeConverter.toItem(dto.getDestinataireEmploye()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setEntreprisesAdroitAcces(entrepriseConverter.toItem(dto.getEntreprisesAdroitAcces()));
item.setPermissionsAcces(permissionsAccesConverter.toItem(dto.getPermissionsAcces()));
item.setAdmin(dto.getAdmin());
return item;
}
protected EmployeDto convertToDto(Employe item) {
var dto = new EmployeDto();
appUserConverter.convertToChildDto(item, dto);
dto.setCode(item.getCode());
dto.setNom(item.getNom());
dto.setPrenom(item.getPrenom());
dto.setTelephone(item.getTelephone());
dto.setAdresse(adresse? adresseConverter.toDto(item.getAdresse()): null);
dto.setDestinataireEmploye(destinataireEmploye? destinataireEmployeConverter.toDto(item.getDestinataireEmploye()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setEntreprisesAdroitAcces(entreprise? entrepriseConverter.toDto(item.getEntreprisesAdroitAcces()): null);
dto.setPermissionsAcces(permissionsAcces? permissionsAccesConverter.toDto(item.getPermissionsAcces()):null);
dto.setAdmin(item.getAdmin());
return dto;
}
public void setAdresse(boolean value) {
this.adresse = value;
}
public void setPermissionsAcces(boolean value) {
        this.permissionsAcces = value;
    }

public void setDestinataireEmploye(boolean value) {
this.destinataireEmploye = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setAdresseConverter(AdresseConverter value) {
this.adresseConverter = value;
}
public AdresseConverter getAdresseConverter() {
return adresseConverter;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
}
public EntrepriseConverter getEntrepriseConverter() {
return entrepriseConverter;
}
public void setDestinataireEmployeConverter(DestinataireEmployeConverter value) {
this.destinataireEmployeConverter = value;
}
public DestinataireEmployeConverter getDestinataireEmployeConverter() {
return destinataireEmployeConverter;
}


}