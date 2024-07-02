package org.sir.appgestionstock.bean.core.parametres;
import org.sir.appgestionstock.bean.enums.StatutAlerteEnum;
import jakarta.persistence.*;

import java.util.*;
@Entity
@Table(name="alerte")
public class Alerte {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
@Enumerated(EnumType.STRING)
private StatutAlerteEnum statut;
private boolean actif;
@OneToMany(mappedBy = "alerte")
private List<DestinataireEmploye> destinataireEmploye;

public Alerte() {
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
public StatutAlerteEnum getStatut() {
return statut;
}
public void setStatut(StatutAlerteEnum value) {
this.statut = value;
}
public boolean isActif() {
return actif;
}
public void setActif(boolean value) {
this.actif = value;
}
public List<DestinataireEmploye> getDestinataireEmploye() {
return destinataireEmploye;
}
public void setDestinataireEmploye(List<DestinataireEmploye> value) {
this.destinataireEmploye = value;
}

@Override
public boolean equals(Object object) {
if (object instanceof Alerte alerte) {
return alerte.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}