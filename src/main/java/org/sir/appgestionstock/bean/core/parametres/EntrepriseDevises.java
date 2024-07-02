package org.sir.appgestionstock.bean.core.parametres;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
/**
* This Class is for Association between 'Entreprise' and 'Devises'
*/
@Entity
@Table(name="entreprisedevises")
public class EntrepriseDevises {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private boolean defaut;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
@ManyToOne(fetch = FetchType.LAZY)
private Devises devises;
public EntrepriseDevises() {
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public boolean isDefaut() {
return defaut;
}
public void setDefaut(boolean value) {
this.defaut = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
public Devises getDevises() {
return devises;
}
public void setDevises(Devises value) {
this.devises = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof EntrepriseDevises entrepriseDevises) {
return entrepriseDevises.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}