package org.sir.appgestionstock.bean.core.parametres;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.bean.enums.StatutNiveauPrixEnum;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="niveauprix")
public class NiveauPrix {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
@Enumerated(EnumType.STRING)
private StatutNiveauPrixEnum type;
private boolean actif;
@OneToMany(mappedBy = "niveauPrix")
private List<ProduitNiveauPrix> produitNiveauPrix;

    private Long idEntreprise;

public NiveauPrix() {
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
public List<ProduitNiveauPrix> getProduitNiveauPrix() {
return produitNiveauPrix;
}
public void setProduitNiveauPrix(List<ProduitNiveauPrix> value) {
this.produitNiveauPrix = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof NiveauPrix niveauPrix) {
return niveauPrix.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}