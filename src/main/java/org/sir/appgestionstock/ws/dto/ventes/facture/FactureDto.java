package org.sir.appgestionstock.ws.dto.ventes.facture;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.adresse.AdresseDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.NiveauPrixDto;
import org.sir.appgestionstock.ws.dto.ventes.PaiementDto;
import org.sir.appgestionstock.ws.dto.ventes.commande.CommandeDto;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitDto;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.ws.dto.parametres.DevisesDto;
import org.sir.appgestionstock.ws.dto.parametres.TaxeDto;
import org.sir.appgestionstock.bean.enums.TypeRabaisEnum;
import org.sir.appgestionstock.bean.enums.StatutFactureEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FactureDto {
private Long id;
private String code;
private LocalDate dateExperation;
private LocalDate dateCreation;
private LocalDate dateExpedition;
private float rabais;
private TypeRabaisEnum typeRabais;
private int totalUnites;
private double remiseGlobal;
private double sousTotal;
private double total;
private StatutFactureEnum statut;
private PaiementDto paiement;
private RetourProduitDto retourProduit;
private TaxeDto taxe;
private TaxeDto taxeExpedition;
private ClientDto client;
private DevisesDto devises;
private NiveauPrixDto niveauPrix;
private AdresseDto addressFacturation;
private AdresseDto addressExpedition;
private List<FactureProduitDto> factureProduit;
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
public PaiementDto getPaiement() {
return paiement;
}
public void setPaiement(PaiementDto value) {
this.paiement = value;
}
public RetourProduitDto getRetourProduit() {
return retourProduit;
}
public void setRetourProduit(RetourProduitDto value) {
this.retourProduit = value;
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
public ClientDto getClient() {
return client;
}
public void setClient(ClientDto value) {
this.client = value;
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
public AdresseDto getAddressFacturation() {
return addressFacturation;
}
public void setAddressFacturation(AdresseDto value) {
this.addressFacturation = value;
}
public AdresseDto getAddressExpedition() {
return addressExpedition;
}
public void setAddressExpedition(AdresseDto value) {
this.addressExpedition = value;
}
public List<FactureProduitDto> getFactureProduit() {
return factureProduit;
}
public void setFactureProduit(List<FactureProduitDto> value) {
this.factureProduit = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}



}
