package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaxeDto {
private Long id;
private String nom;
private double tauxImposition;
private boolean actif;
    private Long idEntreprise;

public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
    public Long getIdEntreprise() {
        return idEntreprise;
    }
    public void setIdEntreprise(Long idEntreprise) {
        this.idEntreprise = idEntreprise;
    }
public String getNom() {
return nom;
}
public void setNom(String value) {
this.nom = value;
}
public double getTauxImposition() {
return tauxImposition;
}
public void setTauxImposition(double value) {
this.tauxImposition = value;
}
public boolean isActif() {
return actif;
}
public void setActif(boolean value) {
this.actif = value;
}
}