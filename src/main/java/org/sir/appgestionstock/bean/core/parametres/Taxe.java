package org.sir.appgestionstock.bean.core.parametres;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="taxe")
public class Taxe {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private double tauxImposition;
private boolean actif;

    private Long idEntreprise;

public Taxe() {
}
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
@Override
public boolean equals(Object object) {
if (object instanceof Taxe taxe) {
return taxe.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}