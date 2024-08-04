package org.sir.appgestionstock.bean.core.parametres;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="methodepaiement")
public class MethodePaiement {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private boolean disponiblePos;
private boolean actif;
private Long idEntreprise;

public MethodePaiement() {
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
public boolean isDisponiblePos() {
return disponiblePos;
}
public void setDisponiblePos(boolean value) {
this.disponiblePos = value;
}
public boolean isActif() {
return actif;
}
public void setActif(boolean value) {
this.actif = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof MethodePaiement methodePaiement) {
return methodePaiement.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}