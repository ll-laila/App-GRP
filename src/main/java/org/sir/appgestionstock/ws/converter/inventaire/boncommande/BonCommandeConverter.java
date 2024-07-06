package org.sir.appgestionstock.ws.converter.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeDto;
import org.sir.appgestionstock.ws.converter.inventaire.livraison.LivraisonConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.contacts.FournisseurConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class BonCommandeConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private FournisseurConverter fournisseurConverter;
@Autowired private BonCommandeProduitConverter bonCommandeProduitConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private LivraisonConverter livraisonConverter;
@Autowired private TaxeConverter taxeConverter;
private boolean livraison = true;
private boolean taxe = true;
private boolean taxeExpedition = true;
private boolean fournisseur = true;
private boolean devises = true;
private boolean niveauPrix = true;
private boolean bonCommandeProduit = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setBonCommande(value);
this.bonCommandeProduitConverter.setBonCommande(value);
}
public final BonCommandeDto toDto(BonCommande item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final BonCommande toItem(BonCommandeDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<BonCommande> toItem(List<BonCommandeDto> dtos) {
if (dtos == null) return null;
List<BonCommande> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<BonCommandeDto> toDto(List<BonCommande> items) {
if (items == null) return null;
List<BonCommandeDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected BonCommande convertToItem(BonCommandeDto dto) {
var item = new BonCommande();
item.setId(dto.getId());
item.setCode(dto.getCode());
item.setDateCreation(dto.getDateCreation());
item.setDateExpedition(dto.getDateExpedition());
item.setRabais(dto.getRabais());
item.setTypeRabais(dto.getTypeRabais());
item.setRemiseGlobal(dto.getRemiseGlobal());
item.setTotalUnites(dto.getTotalUnites());
item.setSousTotal(dto.getSousTotal());
item.setTotal(dto.getTotal());
item.setStatut(dto.getStatut());
//item.setLivraison(livraisonConverter.toItem(dto.getLivraison()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setTaxeExpedition(taxeConverter.toItem(dto.getTaxeExpedition()));
item.setFournisseur(fournisseurConverter.toItem(dto.getFournisseur()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
item.setBonCommandeProduit(bonCommandeProduitConverter.toItem(dto.getBonCommandeProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected BonCommandeDto convertToDto(BonCommande item) {
var dto = new BonCommandeDto();
dto.setId(item.getId());
dto.setCode(item.getCode());
dto.setDateCreation(item.getDateCreation());
dto.setDateExpedition(item.getDateExpedition());
dto.setRabais(item.getRabais());
dto.setTypeRabais(item.getTypeRabais());
dto.setRemiseGlobal(item.getRemiseGlobal());
dto.setTotalUnites(item.getTotalUnites());
dto.setSousTotal(item.getSousTotal());
dto.setTotal(item.getTotal());
dto.setStatut(item.getStatut());
//dto.setLivraison(livraison? livraisonConverter.toDto(item.getLivraison()): null);
dto.setTaxe(taxe? taxeConverter.toDto(item.getTaxe()): null);
dto.setTaxeExpedition(taxeExpedition? taxeConverter.toDto(item.getTaxeExpedition()): null);
dto.setFournisseur(fournisseur? fournisseurConverter.toDto(item.getFournisseur()): null);
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
dto.setNiveauPrix(niveauPrix? niveauPrixConverter.toDto(item.getNiveauPrix()): null);
dto.setBonCommandeProduit(bonCommandeProduit? bonCommandeProduitConverter.toDto(item.getBonCommandeProduit()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
}
public void setLivraison(boolean value) {
this.livraison = value;
}
public void setTaxe(boolean value) {
this.taxe = value;
}
public void setTaxeExpedition(boolean value) {
this.taxeExpedition = value;
}
public void setFournisseur(boolean value) {
this.fournisseur = value;
}
public void setDevises(boolean value) {
this.devises = value;
}
public void setNiveauPrix(boolean value) {
this.niveauPrix = value;
}
public void setBonCommandeProduit(boolean value) {
this.bonCommandeProduit = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
}
public EntrepriseConverter getEntrepriseConverter() {
return entrepriseConverter;
}
public void setNiveauPrixConverter(NiveauPrixConverter value) {
this.niveauPrixConverter = value;
}
public NiveauPrixConverter getNiveauPrixConverter() {
return niveauPrixConverter;
}
public void setFournisseurConverter(FournisseurConverter value) {
this.fournisseurConverter = value;
}
public FournisseurConverter getFournisseurConverter() {
return fournisseurConverter;
}
public void setBonCommandeProduitConverter(BonCommandeProduitConverter value) {
this.bonCommandeProduitConverter = value;
}
public BonCommandeProduitConverter getBonCommandeProduitConverter() {
return bonCommandeProduitConverter;
}
public void setDevisesConverter(DevisesConverter value) {
this.devisesConverter = value;
}
public DevisesConverter getDevisesConverter() {
return devisesConverter;
}
public void setLivraisonConverter(LivraisonConverter value) {
this.livraisonConverter = value;
}
public LivraisonConverter getLivraisonConverter() {
return livraisonConverter;
}
public void setTaxeConverter(TaxeConverter value) {
this.taxeConverter = value;
}
public TaxeConverter getTaxeConverter() {
return taxeConverter;
}
}