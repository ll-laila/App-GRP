package org.sir.appgestionstock.bean.core.parametres;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="nouvelledevise")
public class NouvelleDevise {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String labelle;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
    private Long idEntreprise;


public NouvelleDevise() {
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

public String getLabelle() {
return labelle;
}
public void setLabelle(String value) {
this.labelle = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof NouvelleDevise nouvelleDevise) {
return nouvelleDevise.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}