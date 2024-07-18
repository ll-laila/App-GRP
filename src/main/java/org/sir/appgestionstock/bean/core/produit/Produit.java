package org.sir.appgestionstock.bean.core.produit;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="produit")
public class Produit {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String nom;
private String sku;
private String barcode;
private double coutInitial;
private int quantiteMinimumCommandeClient;
private int niveauStockInitial;
private String emplacementDeBac;
private int pointCommande;
private double prixGros;
private double prixDetailRecommande;
private double prixAchat;
private double disponible;

@OneToOne()
private NiveauStock niveauStock;
@ManyToOne(fetch = FetchType.LAZY)
private Devises devises;
@ManyToOne(fetch = FetchType.LAZY)
private Taxe taxe;
@OneToMany(mappedBy = "produit")
private List<ProduitNiveauPrix> produitNiveauPrix;
@OneToMany(mappedBy = "produit")
private List<CommandeProduit> commandeProduit;
@OneToMany(mappedBy = "produit")
private List<FactureProduit> factureProduit;
@OneToMany(mappedBy = "produit")
private List<DevisProduit> devisProduit;
@OneToMany(mappedBy = "produit")
private List<RetourProduitProduit> retourProduitProduit;
@OneToMany(mappedBy = "produit")
private List<BonCommandeProduit> bonCommandeProduit;
@OneToMany(mappedBy = "produit")
private List<LivraisonProduit> livraisonProduit;
@ManyToOne(fetch = FetchType.LAZY)
private Fournisseur fournisseur;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
public Produit() {
}
public Produit(Long id, String label) {
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
public String getSku() {
return sku;
}
public void setSku(String value) {
this.sku = value;
}
public String getBarcode() {
return barcode;
}
public void setBarcode(String value) {
this.barcode = value;
}
public double getCoutInitial() {
return coutInitial;
}
public void setCoutInitial(double value) {
this.coutInitial = value;
}
public int getQuantiteMinimumCommandeClient() {
return quantiteMinimumCommandeClient;
}
public void setQuantiteMinimumCommandeClient(int value) {
this.quantiteMinimumCommandeClient = value;
}
public int getNiveauStockInitial() {
return niveauStockInitial;
}
public void setNiveauStockInitial(int value) {
this.niveauStockInitial = value;
}
public String getEmplacementDeBac() {
return emplacementDeBac;
}
public void setEmplacementDeBac(String value) {
this.emplacementDeBac = value;
}
public int getPointCommande() {
return pointCommande;
}
public void setPointCommande(int value) {
this.pointCommande = value;
}
public double getPrixGros() {
return prixGros;
}
public void setPrixGros(double value) {
this.prixGros = value;
}
public double getPrixDetailRecommande() {
return prixDetailRecommande;
}
public void setPrixDetailRecommande(double value) {
this.prixDetailRecommande = value;
}
public double getPrixAchat() {
return prixAchat;
}
public void setPrixAchat(double value) {
this.prixAchat = value;
}
public NiveauStock getNiveauStock() {
return niveauStock;
}
public void setNiveauStock(NiveauStock value) {
this.niveauStock = value;
}
public Devises getDevises() {
return devises;
}
public void setDevises(Devises value) {
this.devises = value;
}
public Taxe getTaxe() {
return taxe;
}
public void setTaxe(Taxe value) {
this.taxe = value;
}
public List<ProduitNiveauPrix> getProduitNiveauPrix() {
return produitNiveauPrix;
}
public void setProduitNiveauPrix(List<ProduitNiveauPrix> value) {
this.produitNiveauPrix = value;
}
public List<CommandeProduit> getCommandeProduit() {
return commandeProduit;
}
public void setCommandeProduit(List<CommandeProduit> value) {
this.commandeProduit = value;
}
public List<FactureProduit> getFactureProduit() {
return factureProduit;
}
public void setFactureProduit(List<FactureProduit> value) {
this.factureProduit = value;
}
public List<DevisProduit> getDevisProduit() {
return devisProduit;
}
public void setDevisProduit(List<DevisProduit> value) {
this.devisProduit = value;
}
public List<RetourProduitProduit> getRetourProduitProduit() {
return retourProduitProduit;
}
public void setRetourProduitProduit(List<RetourProduitProduit> value) {
this.retourProduitProduit = value;
}
public List<BonCommandeProduit> getBonCommandeProduit() {
return bonCommandeProduit;
}
public void setBonCommandeProduit(List<BonCommandeProduit> value) {
this.bonCommandeProduit = value;
}
public List<LivraisonProduit> getLivraisonProduit() {
return livraisonProduit;
}
public void setLivraisonProduit(List<LivraisonProduit> value) {
this.livraisonProduit = value;
}
public Fournisseur getFournisseur() {
return fournisseur;
}
public void setFournisseur(Fournisseur value) {
this.fournisseur = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}

    public double getDisponible() {
        return disponible;
    }

    public void setDisponible(double disponible) {
        this.disponible = disponible;
    }

    @Override
public boolean equals(Object object) {
if (object instanceof Produit produit) {
return produit.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}