package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EntrepriseDevisesDto {
private Long id;
private boolean defaut;
private EntrepriseDto entreprise;
private DevisesDto devises;
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public boolean isDefaut() {
return defaut;
}
public void setDefaut(boolean value) {
this.defaut = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
public DevisesDto getDevises() {
return devises;
}
public void setDevises(DevisesDto value) {
this.devises = value;
}
}