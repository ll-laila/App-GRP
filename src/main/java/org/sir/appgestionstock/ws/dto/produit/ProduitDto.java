package org.sir.appgestionstock.ws.dto.produit;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.inventaire.NiveauStockDto;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureProduitDto;
import org.sir.appgestionstock.ws.dto.ventes.devis.DevisProduitDto;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeProduitDto;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitProduitDto;
import org.sir.appgestionstock.ws.dto.contacts.FournisseurDto;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonProduitDto;
import org.sir.appgestionstock.ws.dto.parametres.DevisesDto;
import org.sir.appgestionstock.ws.dto.ventes.commande.CommandeProduitDto;
import org.sir.appgestionstock.ws.dto.parametres.TaxeDto;
import org.sir.appgestionstock.zsecurity.entity.AppUser;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProduitDto {
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
private NiveauStockDto niveauStock;
private DevisesDto devises;
private TaxeDto taxe;
private List<ProduitNiveauPrixDto> produitNiveauPrix;
private List<CommandeProduitDto> commandeProduit;
private List<FactureProduitDto> factureProduit;
private List<DevisProduitDto> devisProduit;
private List<RetourProduitProduitDto> retourProduitProduit;
private List<BonCommandeProduitDto> bonCommandeProduit;
private List<LivraisonProduitDto> livraisonProduit;
private FournisseurDto fournisseur;
private EntrepriseDto entreprise;
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
public NiveauStockDto getNiveauStock() {
return niveauStock;
}
public void setNiveauStock(NiveauStockDto value) {
this.niveauStock = value;
}
public DevisesDto getDevises() {
return devises;
}
public void setDevises(DevisesDto value) {
this.devises = value;
}
public TaxeDto getTaxe() {
return taxe;
}
public void setTaxe(TaxeDto value) {
this.taxe = value;
}
public List<ProduitNiveauPrixDto> getProduitNiveauPrix() {
return produitNiveauPrix;
}
public void setProduitNiveauPrix(List<ProduitNiveauPrixDto> value) {
this.produitNiveauPrix = value;
}
public List<CommandeProduitDto> getCommandeProduit() {
return commandeProduit;
}
public void setCommandeProduit(List<CommandeProduitDto> value) {
this.commandeProduit = value;
}
public List<FactureProduitDto> getFactureProduit() {
return factureProduit;
}
public void setFactureProduit(List<FactureProduitDto> value) {
this.factureProduit = value;
}
public List<DevisProduitDto> getDevisProduit() {
return devisProduit;
}
public void setDevisProduit(List<DevisProduitDto> value) {
this.devisProduit = value;
}
public List<RetourProduitProduitDto> getRetourProduitProduit() {
return retourProduitProduit;
}
public void setRetourProduitProduit(List<RetourProduitProduitDto> value) {
this.retourProduitProduit = value;
}
public List<BonCommandeProduitDto> getBonCommandeProduit() {
return bonCommandeProduit;
}
public void setBonCommandeProduit(List<BonCommandeProduitDto> value) {
this.bonCommandeProduit = value;
}
public List<LivraisonProduitDto> getLivraisonProduit() {
return livraisonProduit;
}
public void setLivraisonProduit(List<LivraisonProduitDto> value) {
this.livraisonProduit = value;
}
public FournisseurDto getFournisseur() {
return fournisseur;
}
public void setFournisseur(FournisseurDto value) {
this.fournisseur = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}

public double getDisponible() {
        return disponible;
    }

public void setDisponible(double disponible) {
        this.disponible = disponible;
    }

}