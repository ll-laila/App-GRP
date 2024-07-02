package org.sir.appgestionstock.bean.core.produit;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
/**
* This Class is for Association between 'NiveauPrix' and 'Produit'
*/
@Entity
@Table(name="produitniveauprix")
public class ProduitNiveauPrix {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private double prix;
@ManyToOne(fetch = FetchType.LAZY)
private Produit produit;
@ManyToOne(fetch = FetchType.LAZY)
private NiveauPrix niveauPrix;
public ProduitNiveauPrix() {
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public double getPrix() {
return prix;
}
public void setPrix(double value) {
this.prix = value;
}
public Produit getProduit() {
return produit;
}
public void setProduit(Produit value) {
this.produit = value;
}
public NiveauPrix getNiveauPrix() {
return niveauPrix;
}
public void setNiveauPrix(NiveauPrix value) {
this.niveauPrix = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof ProduitNiveauPrix produitNiveauPrix) {
return produitNiveauPrix.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}