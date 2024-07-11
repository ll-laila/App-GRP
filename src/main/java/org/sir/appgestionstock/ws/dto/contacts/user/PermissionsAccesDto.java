package org.sir.appgestionstock.ws.dto.contacts.user;


import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PermissionsAccesDto {

    private String nom;
    private boolean etat;
    private Long entrepriseId;

    public PermissionsAccesDto(){}


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public boolean getEtat() {
        return etat;
    }

    public void setEtat(boolean etat) {
        this.etat = etat;
    }

    public Long getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(Long entrepriseId) {
        this.entrepriseId = entrepriseId;
    }

}
