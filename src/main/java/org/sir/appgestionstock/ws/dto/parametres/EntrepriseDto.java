package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.adresse.AdresseDto;
import org.sir.appgestionstock.ws.dto.ventes.PaiementDto;
import org.sir.appgestionstock.ws.dto.inventaire.NiveauStockDto;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitDto;
import org.sir.appgestionstock.ws.dto.ventes.commande.CommandeDto;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonDto;
import org.sir.appgestionstock.ws.dto.produit.ProduitDto;
import org.sir.appgestionstock.ws.dto.ventes.devis.DevisDto;
import org.sir.appgestionstock.ws.dto.contacts.FournisseurDto;
import org.sir.appgestionstock.ws.dto.contacts.user.EmployeDto;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeDto;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureDto;

import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EntrepriseDto {
private Long id;
private String nom;
private String email;
private String telephone;
private String siteweb;
private byte[] logo;
private AdresseDto adresse;
private List<EmployeDto> employes;
private List<ProduitDto> produits;
private List<ClientDto> clients;
private List<FournisseurDto> fournisseurs;
private List<PaiementDto> paiement;
private List<LivraisonDto> livraison;
private List<BonCommandeDto> bonCommande;
private List<NiveauStockDto> niveauStock;
private List<RetourProduitDto> retourProduit;
private List<FactureDto> facture;
private List<CommandeDto> commande;
private List<DevisesDto> devisesList;
private List<NouvelleDeviseDto> nouvelleDevises;
private List<DevisDto> devisList;
private List<EntrepriseDevisesDto> entrepriseDevises;
private Long idAdmin;


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
public AdresseDto getAdresse() {
return adresse;
}
public void setAdresse(AdresseDto value) {
this.adresse = value;
}
public List<EmployeDto> getEmployes() {
return employes;
}
public void setEmployes(List<EmployeDto> value) {
this.employes = value;
}
public List<ProduitDto> getProduits() {
return produits;
}
public void setProduits(List<ProduitDto> value) {
this.produits = value;
}
public List<ClientDto> getClients() {
return clients;
}
public void setClients(List<ClientDto> value) {
this.clients = value;
}
public List<FournisseurDto> getFournisseurs() {
return fournisseurs;
}
public void setFournisseurs(List<FournisseurDto> value) {
this.fournisseurs = value;
}
public List<PaiementDto> getPaiement() {
return paiement;
}
public void setPaiement(List<PaiementDto> value) {
this.paiement = value;
}
public List<LivraisonDto> getLivraison() {
return livraison;
}
public void setLivraison(List<LivraisonDto> value) {
this.livraison = value;
}
public List<BonCommandeDto> getBonCommande() {
return bonCommande;
}
public void setBonCommande(List<BonCommandeDto> value) {
this.bonCommande = value;
}
public List<NiveauStockDto> getNiveauStock() {
return niveauStock;
}
public void setNiveauStock(List<NiveauStockDto> value) {
this.niveauStock = value;
}
public List<RetourProduitDto> getRetourProduit() {
return retourProduit;
}
public void setRetourProduit(List<RetourProduitDto> value) {
this.retourProduit = value;
}
public List<FactureDto> getFacture() {
return facture;
}
public void setFacture(List<FactureDto> value) {
this.facture = value;
}
public List<CommandeDto> getCommande() {
return commande;
}
public void setCommande(List<CommandeDto> value) {
this.commande = value;
}
public List<DevisesDto> getDevisesList() {
return devisesList;
}
public void setDevisesList(List<DevisesDto> value) {
this.devisesList = value;
}
public List<NouvelleDeviseDto> getNouvelleDevises() {
return nouvelleDevises;
}
public void setNouvelleDevises(List<NouvelleDeviseDto> value) {
this.nouvelleDevises = value;
}
public List<DevisDto> getDevisList() {
return devisList;
}
public void setDevisList(List<DevisDto> value) {
this.devisList = value;
}
public List<EntrepriseDevisesDto> getEntrepriseDevises() {
return entrepriseDevises;
}
public void setEntrepriseDevises(List<EntrepriseDevisesDto> value) {
this.entrepriseDevises = value;
}

public Long getIdAdmin() {
        return idAdmin;
    }
public void setIdAdmin(Long value) {
        this.idAdmin = value;
    }
}