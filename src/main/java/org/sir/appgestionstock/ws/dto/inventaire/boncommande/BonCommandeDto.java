package org.sir.appgestionstock.ws.dto.inventaire.boncommande;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.NiveauPrixDto;
import org.sir.appgestionstock.ws.dto.contacts.FournisseurDto;
import org.sir.appgestionstock.ws.dto.parametres.DevisesDto;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonDto;
import org.sir.appgestionstock.ws.dto.parametres.TaxeDto;
import org.sir.appgestionstock.bean.enums.TypeRabaisEnum;
import org.sir.appgestionstock.bean.enums.StatutBonCommandeEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BonCommandeDto {
private Long id;
private String code;
private LocalDate dateCreation;
private LocalDate dateExpedition;
private float rabais;
private TypeRabaisEnum typeRabais;
private double remiseGlobal;
private int totalUnites;
private double sousTotal;
private double total;
private StatutBonCommandeEnum statut;
private LivraisonDto livraison;
private TaxeDto taxe;
private TaxeDto taxeExpedition;
private FournisseurDto fournisseur;
private DevisesDto devises;
private NiveauPrixDto niveauPrix;
private List<BonCommandeProduitDto> bonCommandeProduit;
private EntrepriseDto entreprise;
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
public LivraisonDto getLivraison() {
return livraison;
}
public void setLivraison(LivraisonDto value) {
this.livraison = value;
}
public TaxeDto getTaxe() {
return taxe;
}
public void setTaxe(TaxeDto value) {
this.taxe = value;
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
public DevisesDto getDevises() {
return devises;
}
public void setDevises(DevisesDto value) {
this.devises = value;
}
public NiveauPrixDto getNiveauPrix() {
return niveauPrix;
}
public void setNiveauPrix(NiveauPrixDto value) {
this.niveauPrix = value;
}
public List<BonCommandeProduitDto> getBonCommandeProduit() {
return bonCommandeProduit;
}
public void setBonCommandeProduit(List<BonCommandeProduitDto> value) {
this.bonCommandeProduit = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
}