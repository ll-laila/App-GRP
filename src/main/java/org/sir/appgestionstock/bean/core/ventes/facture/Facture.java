package org.sir.appgestionstock.bean.core.ventes.facture;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.bean.enums.TypeRabaisEnum;
import org.sir.appgestionstock.bean.enums.StatutFactureEnum;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="facture")
public class Facture {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String code;
private LocalDate dateExperation;
private LocalDate dateCreation;
private LocalDate dateExpedition;
private float rabais;
@Enumerated(EnumType.STRING)
private TypeRabaisEnum typeRabais;
private int totalUnites;
private double remiseGlobal;
private double sousTotal;
private double total;
@Enumerated(EnumType.STRING)
private StatutFactureEnum statut;
@OneToOne()
private Paiement paiement;
@OneToOne()
private RetourProduit retourProduit;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxe;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxeExpedition;
@ManyToOne(fetch = FetchType.LAZY)
private Client client;
@ManyToOne(fetch = FetchType.LAZY)
private Devises devises;
@ManyToOne(fetch = FetchType.LAZY)
private NiveauPrix niveauPrix;
@OneToOne()
private Adresse addressFacturation;
@OneToOne()
private Adresse addressExpedition;
@OneToMany(mappedBy = "facture")
private List<FactureProduit> factureProduit;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;

public Facture() {
}
public Facture(Long id, String label) {
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
public LocalDate getDateExperation() {
return dateExperation;
}
public void setDateExperation(LocalDate value) {
this.dateExperation = value;
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
public int getTotalUnites() {
return totalUnites;
}
public void setTotalUnites(int value) {
this.totalUnites = value;
}
public double getRemiseGlobal() {
return remiseGlobal;
}
public void setRemiseGlobal(double value) {
this.remiseGlobal = value;
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
public StatutFactureEnum getStatut() {
return statut;
}
public void setStatut(StatutFactureEnum value) {
this.statut = value;
}

public Paiement getPaiement() {
return paiement;
}
public void setPaiement(Paiement value) {
this.paiement = value;
}
public RetourProduit getRetourProduit() {
return retourProduit;
}
public void setRetourProduit(RetourProduit value) {
this.retourProduit = value;
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
public Client getClient() {
return client;
}
public void setClient(Client value) {
this.client = value;
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
public Adresse getAddressFacturation() {
return addressFacturation;
}
public void setAddressFacturation(Adresse value) {
this.addressFacturation = value;
}
public Adresse getAddressExpedition() {
return addressExpedition;
}
public void setAddressExpedition(Adresse value) {
this.addressExpedition = value;
}
public List<FactureProduit> getFactureProduit() {
return factureProduit;
}
public void setFactureProduit(List<FactureProduit> value) {
this.factureProduit = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}



@Override
public boolean equals(Object object) {
if (object instanceof Facture facture) {
return facture.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}
