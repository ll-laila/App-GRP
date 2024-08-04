package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DevisesDto {
private Long id;
private double tauxDeChange;
private NouvelleDeviseDto nouvelleDevise;
private List<EntrepriseDevisesDto> entrepriseDevises;
private EntrepriseDto entreprise;
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
public double getTauxDeChange() {
return tauxDeChange;
}
public void setTauxDeChange(double value) {
this.tauxDeChange = value;
}
public NouvelleDeviseDto getNouvelleDevise() {
return nouvelleDevise;
}
public void setNouvelleDevise(NouvelleDeviseDto value) {
this.nouvelleDevise = value;
}
public List<EntrepriseDevisesDto> getEntrepriseDevises() {
return entrepriseDevises;
}
public void setEntrepriseDevises(List<EntrepriseDevisesDto> value) {
this.entrepriseDevises = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
}