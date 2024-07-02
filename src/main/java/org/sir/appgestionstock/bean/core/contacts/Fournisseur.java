package org.sir.appgestionstock.bean.core.contacts;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.enums.LangueEnum;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="fournisseur")
public class Fournisseur {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private String code;
private String email;
private String siteweb;
private String telephone;
@OneToOne()
private Adresse adresse;
private int taxeNumero;
private float rabais;
@Enumerated(EnumType.STRING)
private LangueEnum languePDF;
@ManyToOne(fetch = FetchType.LAZY)
private Devises devises;
@ManyToOne(fetch = FetchType.LAZY)
private NiveauPrix niveauPrix;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxe;
@OneToMany(mappedBy = "fournisseur")
private List<Produit> produits;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
public Fournisseur() {
}
public Fournisseur(Long id, String label) {
// constructor to get optimized fields
this.id = id;
this.nom = label;
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
public String getCode() {
return code;
}
public void setCode(String value) {
this.code = value;
}
public String getEmail() {
return email;
}
public void setEmail(String value) {
this.email = value;
}
public String getSiteweb() {
return siteweb;
}
public void setSiteweb(String value) {
this.siteweb = value;
}
public String getTelephone() {
return telephone;
}
public void setTelephone(String value) {
this.telephone = value;
}
public Adresse getAdresse() {
return adresse;
}
public void setAdresse(Adresse value) {
this.adresse = value;
}
public int getTaxeNumero() {
return taxeNumero;
}
public void setTaxeNumero(int value) {
this.taxeNumero = value;
}
public float getRabais() {
return rabais;
}
public void setRabais(float value) {
this.rabais = value;
}
public LangueEnum getLanguePDF() {
return languePDF;
}
public void setLanguePDF(LangueEnum value) {
this.languePDF = value;
}
public Devises getDevises() {
return devises;
}
public void setDevises(Devises value) {
this.devises = value;
}
public NiveauPrix getNiveauPrix() {
return niveauPrix;
}
public void setNiveauPrix(NiveauPrix value) {
this.niveauPrix = value;
}
public Taxe getTaxe() {
return taxe;
}
public void setTaxe(Taxe value) {
this.taxe = value;
}
public List<Produit> getProduits() {
return produits;
}
public void setProduits(List<Produit> value) {
this.produits = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof Fournisseur fournisseur) {
return fournisseur.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}