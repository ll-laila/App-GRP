package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NouvelleDeviseDto {
private Long id;
private String labelle;
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
public String getLabelle() {
return labelle;
}
public void setLabelle(String value) {
this.labelle = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
}