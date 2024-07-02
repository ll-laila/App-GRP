package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.contacts.user.AdminDto;
import org.sir.appgestionstock.bean.enums.StatutAlerteEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlerteDto {
private Long id;
private String nom;
private StatutAlerteEnum statut;
private boolean actif;
private List<DestinataireEmployeDto> destinataireEmploye;
private AdminDto admin;
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public String getNom() {
return nom;
}
public void setNom(String value) {
this.nom = value;
}
public StatutAlerteEnum getStatut() {
return statut;
}
public void setStatut(StatutAlerteEnum value) {
this.statut = value;
}
public boolean isActif() {
return actif;
}
public void setActif(boolean value) {
this.actif = value;
}
public List<DestinataireEmployeDto> getDestinataireEmploye() {
return destinataireEmploye;
}
public void setDestinataireEmploye(List<DestinataireEmployeDto> value) {
this.destinataireEmploye = value;
}
public AdminDto getAdmin() {
return admin;
}
public void setAdmin(AdminDto value) {
this.admin = value;
}
}