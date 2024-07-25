package org.sir.appgestionstock.ws.converter.ventes.facture;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureDto;
import org.sir.appgestionstock.ws.converter.ventes.PaiementConverter;
import org.sir.appgestionstock.ws.converter.ventes.retourproduit.RetourProduitConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class FactureConverter {
@Autowired private AdresseConverter adresseConverter;
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private PaiementConverter paiementConverter;
@Autowired private RetourProduitConverter retourProduitConverter;
@Autowired private FactureProduitConverter factureProduitConverter;
@Autowired private ClientConverter clientConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private TaxeConverter taxeConverter;
private boolean paiement = true;
private boolean retourProduit = true;
private boolean taxe = true;
private boolean taxeExpedition = true;
private boolean client = true;
private boolean devises = true;
private boolean niveauPrix = true;
private boolean addressFacturation = true;
private boolean addressExpedition = true;
private boolean factureProduit = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setFacture(value);
this.factureProduitConverter.setFacture(value);
}
public final FactureDto toDto(Facture item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Facture toItem(FactureDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Facture> toItem(List<FactureDto> dtos) {
if (dtos == null) return null;
List<Facture> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<FactureDto> toDto(List<Facture> items) {
if (items == null) return null;
List<FactureDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Facture convertToItem(FactureDto dto) {
var item = new Facture();
item.setId(dto.getId());
item.setCode(dto.getCode());
item.setDateExperation(dto.getDateExperation());
item.setDateCreation(dto.getDateCreation());
item.setDateExpedition(dto.getDateExpedition());
item.setRabais(dto.getRabais());
item.setTypeRabais(dto.getTypeRabais());
item.setTotalUnites(dto.getTotalUnites());
item.setRemiseGlobal(dto.getRemiseGlobal());
item.setSousTotal(dto.getSousTotal());
item.setTotal(dto.getTotal());
item.setStatut(dto.getStatut());;

item.setPaiement(paiementConverter.toItem(dto.getPaiement()));
item.setRetourProduit(retourProduitConverter.toItem(dto.getRetourProduit()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setTaxeExpedition(taxeConverter.toItem(dto.getTaxeExpedition()));
item.setClient(clientConverter.toItem(dto.getClient()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
item.setAddressFacturation(adresseConverter.toItem(dto.getAddressFacturation()));
item.setAddressExpedition(adresseConverter.toItem(dto.getAddressExpedition()));
item.setFactureProduit(factureProduitConverter.toItem(dto.getFactureProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected FactureDto convertToDto(Facture item) {
var dto = new FactureDto();
dto.setId(item.getId());
dto.setCode(item.getCode());
dto.setDateExperation(item.getDateExperation());
dto.setDateCreation(item.getDateCreation());
dto.setDateExpedition(item.getDateExpedition());
dto.setRabais(item.getRabais());
dto.setTypeRabais(item.getTypeRabais());
dto.setTotalUnites(item.getTotalUnites());
dto.setRemiseGlobal(item.getRemiseGlobal());
dto.setSousTotal(item.getSousTotal());
dto.setTotal(item.getTotal());
dto.setStatut(item.getStatut());
dto.setPaiement(paiement? paiementConverter.toDto(item.getPaiement()): null);
dto.setRetourProduit(retourProduit? retourProduitConverter.toDto(item.getRetourProduit()): null);
dto.setTaxe(taxe? taxeConverter.toDto(item.getTaxe()): null);
dto.setTaxeExpedition(taxeExpedition? taxeConverter.toDto(item.getTaxeExpedition()): null);
dto.setClient(client? clientConverter.toDto(item.getClient()): null);
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
dto.setNiveauPrix(niveauPrix? niveauPrixConverter.toDto(item.getNiveauPrix()): null);
dto.setAddressFacturation(addressFacturation? adresseConverter.toDto(item.getAddressFacturation()): null);
dto.setAddressExpedition(addressExpedition? adresseConverter.toDto(item.getAddressExpedition()): null);
dto.setFactureProduit(factureProduit? factureProduitConverter.toDto(item.getFactureProduit()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);

return dto;
}
public void setPaiement(boolean value) {
this.paiement = value;
}
public void setRetourProduit(boolean value) {
this.retourProduit = value;
}
public void setTaxe(boolean value) {
this.taxe = value;
}
public void setTaxeExpedition(boolean value) {
this.taxeExpedition = value;
}
public void setClient(boolean value) {
this.client = value;
}
public void setDevises(boolean value) {
this.devises = value;
}
public void setNiveauPrix(boolean value) {
this.niveauPrix = value;
}
public void setAddressFacturation(boolean value) {
this.addressFacturation = value;
}
public void setAddressExpedition(boolean value) {
this.addressExpedition = value;
}
public void setFactureProduit(boolean value) {
this.factureProduit = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setAdresseConverter(AdresseConverter value) {
this.adresseConverter = value;
}
public AdresseConverter getAdresseConverter() {
return adresseConverter;
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
public void setPaiementConverter(PaiementConverter value) {
this.paiementConverter = value;
}
public PaiementConverter getPaiementConverter() {
return paiementConverter;
}
public void setRetourProduitConverter(RetourProduitConverter value) {
this.retourProduitConverter = value;
}
public RetourProduitConverter getRetourProduitConverter() {
return retourProduitConverter;
}
public void setFactureProduitConverter(FactureProduitConverter value) {
this.factureProduitConverter = value;
}
public FactureProduitConverter getFactureProduitConverter() {
return factureProduitConverter;
}
public void setClientConverter(ClientConverter value) {
this.clientConverter = value;
}
public ClientConverter getClientConverter() {
return clientConverter;
}
public void setDevisesConverter(DevisesConverter value) {
this.devisesConverter = value;
}
public DevisesConverter getDevisesConverter() {
return devisesConverter;
}
public void setTaxeConverter(TaxeConverter value) {
this.taxeConverter = value;
}
public TaxeConverter getTaxeConverter() {
return taxeConverter;
}
}
