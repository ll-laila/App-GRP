package org.sir.appgestionstock.ws.dto.inventaire.livraison;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.contacts.FournisseurDto;
import org.sir.appgestionstock.ws.dto.parametres.TaxeDto;
import org.sir.appgestionstock.bean.enums.StatutLivraisonEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LivraisonDto {
private Long id;
private String code;
private LocalDate dateCreation;
private LocalDate dateExpedition;
private double remiseGlobal;
private int totalUnites;
private double sousTotal;
private double total;
private StatutLivraisonEnum statut;
private TaxeDto taxeExpedition;
private FournisseurDto fournisseur;
private List<LivraisonProduitDto> livraisonProduit;
private EntrepriseDto entreprise;
private BonCommandeDto bonCommande;
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
public StatutLivraisonEnum getStatut() {
return statut;
}
public void setStatut(StatutLivraisonEnum value) {
this.statut = value;
}
public TaxeDto getTaxeExpedition() {
return taxeExpedition;
}
public void setTaxeExpedition(TaxeDto value) {
this.taxeExpedition = value;
}
public FournisseurDto getFournisseur() {
return fournisseur;
}
public void setFournisseur(FournisseurDto value) {
this.fournisseur = value;
}
public List<LivraisonProduitDto> getLivraisonProduit() {
return livraisonProduit;
}
public void setLivraisonProduit(List<LivraisonProduitDto> value) {
this.livraisonProduit = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}

public BonCommandeDto getBonCommande() {
        return bonCommande;
    }
public void setBonCommande(BonCommandeDto value) {
        this.bonCommande = value;
    }
}