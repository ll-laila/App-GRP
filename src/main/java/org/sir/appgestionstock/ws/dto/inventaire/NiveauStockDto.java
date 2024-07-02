package org.sir.appgestionstock.ws.dto.inventaire;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NiveauStockDto {
private Long id;
private String nom;
private String sku;
private String disponible;
private EntrepriseDto entreprise;
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
public String getSku() {
return sku;
}
public void setSku(String value) {
this.sku = value;
}
public String getDisponible() {
return disponible;
}
public void setDisponible(String value) {
this.disponible = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
}