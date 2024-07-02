package org.sir.appgestionstock.bean.core.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.bean.enums.TypeRabaisEnum;
import org.sir.appgestionstock.bean.enums.StatutBonCommandeEnum;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="boncommande")
public class BonCommande {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String code;
private LocalDate dateCreation;
private LocalDate dateExpedition;
private float rabais;
@Enumerated(EnumType.STRING)
private TypeRabaisEnum typeRabais;
private double remiseGlobal;
private int totalUnites;
private double sousTotal;
private double total;
@Enumerated(EnumType.STRING)
private StatutBonCommandeEnum statut;
@OneToOne()
private Livraison livraison;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxe;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxeExpedition;
@ManyToOne(fetch = FetchType.LAZY)
private Fournisseur fournisseur;
@ManyToOne(fetch = FetchType.LAZY)
private Devises devises;
@ManyToOne(fetch = FetchType.LAZY)
private NiveauPrix niveauPrix;
@OneToMany(mappedBy = "bonCommande")
private List<BonCommandeProduit> bonCommandeProduit;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
public BonCommande() {
}
public BonCommande(Long id, String label) {
// constructor to get optimized fields
this.id = id;
this.code = label;
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public String getCode() {
return code;
}
public void setCode(String value) {
this.code = value;
}
public LocalDate getDateCreation() {
return dateCreation;
}
public void setDateCreation(LocalDate value) {
this.dateCreation = value;
}
public LocalDate getDateExpedition() {
return dateExpedition;
}
public void setDateExpedition(LocalDate value) {
this.dateExpedition = value;
}
public float getRabais() {
return rabais;
}
public void setRabais(float value) {
this.rabais = value;
}
public TypeRabaisEnum getTypeRabais() {
return typeRabais;
}
public void setTypeRabais(TypeRabaisEnum value) {
this.typeRabais = value;
}
public double getRemiseGlobal() {
return remiseGlobal;
}
public void setRemiseGlobal(double value) {
this.remiseGlobal = value;
}
public int getTotalUnites() {
return totalUnites;
}
public void setTotalUnites(int value) {
this.totalUnites = value;
}
public double getSousTotal() {
return sousTotal;
}
public void setSousTotal(double value) {
this.sousTotal = value;
}
public double getTotal() {
return total;
}
public void setTotal(double value) {
this.total = value;
}
public StatutBonCommandeEnum getStatut() {
return statut;
}
public void setStatut(StatutBonCommandeEnum value) {
this.statut = value;
}
public Livraison getLivraison() {
return livraison;
}
public void setLivraison(Livraison value) {
this.livraison = value;
}
public Taxe getTaxe() {
return taxe;
}
public void setTaxe(Taxe value) {
this.taxe = value;
}
public Taxe getTaxeExpedition() {
return taxeExpedition;
}
public void setTaxeExpedition(Taxe value) {
this.taxeExpedition = value;
}
public Fournisseur getFournisseur() {
return fournisseur;
}
public void setFournisseur(Fournisseur value) {
this.fournisseur = value;
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
public List<BonCommandeProduit> getBonCommandeProduit() {
return bonCommandeProduit;
}
public void setBonCommandeProduit(List<BonCommandeProduit> value) {
this.bonCommandeProduit = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof BonCommande bonCommande) {
return bonCommande.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}