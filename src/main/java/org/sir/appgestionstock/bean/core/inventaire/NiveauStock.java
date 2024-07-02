package org.sir.appgestionstock.bean.core.inventaire;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="niveaustock")
public class NiveauStock {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private String sku;
private String disponible;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
public NiveauStock() {
}
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
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof NiveauStock niveauStock) {
return niveauStock.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}