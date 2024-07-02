package org.sir.appgestionstock.ws.converter.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.ws.dto.ventes.devis.DevisDto;
import org.sir.appgestionstock.ws.converter.ventes.PaiementConverter;
import org.sir.appgestionstock.ws.converter.ventes.retourproduit.RetourProduitConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class DevisConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private PaiementConverter paiementConverter;
@Autowired private RetourProduitConverter retourProduitConverter;
@Autowired private DevisProduitConverter devisProduitConverter;
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
private boolean devisProduit = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setDevisList(value);
this.devisProduitConverter.setDevis(value);
}
public final DevisDto toDto(Devis item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Devis toItem(DevisDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Devis> toItem(List<DevisDto> dtos) {
if (dtos == null) return null;
List<Devis> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<DevisDto> toDto(List<Devis> items) {
if (items == null) return null;
List<DevisDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Devis convertToItem(DevisDto dto) {
var item = new Devis();
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
item.setStatut(dto.getStatut());
item.setPaiement(paiementConverter.toItem(dto.getPaiement()));
item.setRetourProduit(retourProduitConverter.toItem(dto.getRetourProduit()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setTaxeExpedition(taxeConverter.toItem(dto.getTaxeExpedition()));
item.setClient(clientConverter.toItem(dto.getClient()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
item.setDevisProduit(devisProduitConverter.toItem(dto.getDevisProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected DevisDto convertToDto(Devis item) {
var dto = new DevisDto();
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
dto.setDevisProduit(devisProduit? devisProduitConverter.toDto(item.getDevisProduit()): null);
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
public void setDevisProduit(boolean value) {
this.devisProduit = value;
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
public void setDevisProduitConverter(DevisProduitConverter value) {
this.devisProduitConverter = value;
}
public DevisProduitConverter getDevisProduitConverter() {
return devisProduitConverter;
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