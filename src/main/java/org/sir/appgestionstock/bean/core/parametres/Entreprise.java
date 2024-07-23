package org.sir.appgestionstock.bean.core.parametres;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import jakarta.persistence.*;
import org.sir.appgestionstock.zsecurity.entity.AppUser;

import java.util.*;
@Entity
@Table(name="entreprise")
public class Entreprise {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private String email;
private String telephone;
private String siteweb;
    @Lob
    @Column(length = 1000000)
    private byte[] logo;


    private Long idAdmin;

@OneToOne()
private Adresse adresse;

    @OneToMany(mappedBy = "entreprise", fetch = FetchType.LAZY)
    private List<Employe> employes;

    @ManyToMany
    private List<Employe> employesAdroitAcces;

@OneToMany(mappedBy = "entreprise")
private List<Produit> produits;
@OneToMany(mappedBy = "entreprise")
private List<Client> clients;
@OneToMany(mappedBy = "entreprise")
private List<Fournisseur> fournisseurs;
@OneToMany(mappedBy = "entreprise")
private List<Paiement> paiement;
@OneToMany(mappedBy = "entreprise")
private List<Livraison> livraison;
@OneToMany(mappedBy = "entreprise")
private List<BonCommande> bonCommande;
@OneToMany(mappedBy = "entreprise")
private List<NiveauStock> niveauStock;
@OneToMany(mappedBy = "entreprise")
private List<RetourProduit> retourProduit;
@OneToMany(mappedBy = "entreprise")
private List<Facture> facture;
@OneToMany(mappedBy = "entreprise")
private List<Commande> commande;
@OneToMany(mappedBy = "entreprise")
private List<Devises> devisesList;
@OneToMany(mappedBy = "entreprise")
private List<NouvelleDevise> nouvelleDevises;
@OneToMany(mappedBy = "entreprise")
private List<Devis> devisList;
@OneToMany(mappedBy = "entreprise")
private List<EntrepriseDevises> entrepriseDevises;

public Entreprise() {
    this.employesAdroitAcces = new ArrayList<>();
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
public String getEmail() {
return email;
}
public void setEmail(String value) {
this.email = value;
}
public String getTelephone() {
return telephone;
}
public void setTelephone(String value) {
this.telephone = value;
}
public String getSiteweb() {
return siteweb;
}
public void setSiteweb(String value) {
this.siteweb = value;
}
public byte[] getLogo() {
return logo;
}
public void setLogo(byte[] value) {
this.logo = value;
}
public Adresse getAdresse() {
return adresse;
}
public void setAdresse(Adresse value) {
this.adresse = value;
}
public List<Employe> getEmployes() {
return employes;
}
public void setEmployes(List<Employe> value) {
this.employes = value;
}
public List<Employe> getEmployesAdroitAcces() {
        return employesAdroitAcces;
    }
public void setEmployesAdroitAcces(List<Employe> value) {
        this.employesAdroitAcces = value;
    }
public List<Produit> getProduits() {
return produits;
}
public void setProduits(List<Produit> value) {
this.produits = value;
}
public List<Client> getClients() {
return clients;
}
public void setClients(List<Client> value) {
this.clients = value;
}
public List<Fournisseur> getFournisseurs() {
return fournisseurs;
}
public void setFournisseurs(List<Fournisseur> value) {
this.fournisseurs = value;
}
public List<Paiement> getPaiement() {
return paiement;
}
public void setPaiement(List<Paiement> value) {
this.paiement = value;
}
public List<Livraison> getLivraison() {
return livraison;
}
public void setLivraison(List<Livraison> value) {
this.livraison = value;
}
public List<BonCommande> getBonCommande() {
return bonCommande;
}
public void setBonCommande(List<BonCommande> value) {
this.bonCommande = value;
}
public List<NiveauStock> getNiveauStock() {
return niveauStock;
}
public void setNiveauStock(List<NiveauStock> value) {
this.niveauStock = value;
}
public List<RetourProduit> getRetourProduit() {
return retourProduit;
}
public void setRetourProduit(List<RetourProduit> value) {
this.retourProduit = value;
}
public List<Facture> getFacture() {
return facture;
}
public void setFacture(List<Facture> value) {
this.facture = value;
}
public List<Commande> getCommande() {
return commande;
}
public void setCommande(List<Commande> value) {
this.commande = value;
}
public List<Devises> getDevisesList() {
return devisesList;
}
public void setDevisesList(List<Devises> value) {
this.devisesList = value;
}
public List<NouvelleDevise> getNouvelleDevises() {
return nouvelleDevises;
}
public void setNouvelleDevises(List<NouvelleDevise> value) {
this.nouvelleDevises = value;
}
public List<Devis> getDevisList() {
return devisList;
}
public void setDevisList(List<Devis> value) {
this.devisList = value;
}
public List<EntrepriseDevises> getEntrepriseDevises() {
return entrepriseDevises;
}
public void setEntrepriseDevises(List<EntrepriseDevises> value) {
this.entrepriseDevises = value;
}

    public Long getIdAdmin() {
        return idAdmin;
    }
    public void setIdAdmin(Long value) {
        this.idAdmin = value;
    }

@Override
public boolean equals(Object object) {
if (object instanceof Entreprise entreprise) {
return entreprise.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}