package org.sir.appgestionstock.bean.core.parametres;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="devises")
public class Devises {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private double tauxDeChange;
@ManyToOne(fetch = FetchType.LAZY)
private NouvelleDevise nouvelleDevise;
@OneToMany(mappedBy = "devises")
private List<EntrepriseDevises> entrepriseDevises;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;

    private Long idEntreprise;

public Devises() {
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
public double getTauxDeChange() {
return tauxDeChange;
}
public void setTauxDeChange(double value) {
this.tauxDeChange = value;
}
public NouvelleDevise getNouvelleDevise() {
return nouvelleDevise;
}
public void setNouvelleDevise(NouvelleDevise value) {
this.nouvelleDevise = value;
}
public List<EntrepriseDevises> getEntrepriseDevises() {
return entrepriseDevises;
}
public void setEntrepriseDevises(List<EntrepriseDevises> value) {
this.entrepriseDevises = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof Devises devises) {
return devises.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}