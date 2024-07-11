package org.sir.appgestionstock.bean.core.contacts.user;

import jakarta.persistence.*;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;

import java.util.List;

@Entity
@Table(name = "PermissionsAcces")
public class PermissionsAcces {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private boolean etat;
    private Long entrepriseId;


    public PermissionsAcces(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Long getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(Long id) {
        this.entrepriseId = id;
    }
}
