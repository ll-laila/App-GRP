package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.produit.ProduitNiveauPrixDto;
import org.sir.appgestionstock.bean.enums.StatutNiveauPrixEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NiveauPrixDto {
private Long id;
private String nom;
private StatutNiveauPrixEnum type;
private boolean actif;
    private Long idEntreprise;

private List<ProduitNiveauPrixDto> produitNiveauPrix;
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
public StatutNiveauPrixEnum getType() {
return type;
}
public void setType(StatutNiveauPrixEnum value) {
this.type = value;
}
public boolean isActif() {
return actif;
}
public void setActif(boolean value) {
this.actif = value;
}
public List<ProduitNiveauPrixDto> getProduitNiveauPrix() {
return produitNiveauPrix;
}
public void setProduitNiveauPrix(List<ProduitNiveauPrixDto> value) {
this.produitNiveauPrix = value;
}
}