package org.sir.appgestionstock.ws.converter.ventes.commande;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.ws.dto.ventes.commande.CommandeDto;
import org.sir.appgestionstock.ws.converter.ventes.facture.FactureConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommandeConverter {
@Autowired private AdresseConverter adresseConverter;
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private ClientConverter clientConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private CommandeProduitConverter commandeProduitConverter;
@Autowired private TaxeConverter taxeConverter;
@Autowired private FactureConverter factureConverter;
private boolean facture = true;
private boolean commandeExpedition = true;
private boolean taxe = true;
private boolean taxeExpedition = true;
private boolean client = true;
private boolean devises = true;
private boolean niveauPrix = true;
private boolean addressFacturation = true;
private boolean addressExpedition = true;
private boolean commandeProduit = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setCommande(value);
this.commandeProduitConverter.setCommande(value);
}
public final CommandeDto toDto(Commande item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Commande toItem(CommandeDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Commande> toItem(List<CommandeDto> dtos) {
if (dtos == null) return null;
List<Commande> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<CommandeDto> toDto(List<Commande> items) {
if (items == null) return null;
List<CommandeDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Commande convertToItem(CommandeDto dto) {
var item = new Commande();
item.setId(dto.getId());
item.setCode(dto.getCode());
item.setDateExperation(dto.getDateExperation());
item.setDateCreation(dto.getDateCreation());
item.setDateExpedition(dto.getDateExpedition());
item.setRabais(dto.getRabais());
item.setRemiseGlobal(dto.getRemiseGlobal());
item.setTypeRabais(dto.getTypeRabais());
item.setTotalUnites(dto.getTotalUnites());
item.setSousTotal(dto.getSousTotal());
item.setTotal(dto.getTotal());
item.setStatut(dto.getStatut());
item.setFacture(factureConverter.toItem(dto.getFacture()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setTaxeExpedition(taxeConverter.toItem(dto.getTaxeExpedition()));
item.setClient(clientConverter.toItem(dto.getClient()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
item.setAddressFacturation(adresseConverter.toItem(dto.getAddressFacturation()));
item.setAddressExpedition(adresseConverter.toItem(dto.getAddressExpedition()));
item.setCommandeProduit(commandeProduitConverter.toItem(dto.getCommandeProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected CommandeDto convertToDto(Commande item) {
var dto = new CommandeDto();
dto.setId(item.getId());
dto.setCode(item.getCode());
dto.setDateExperation(item.getDateExperation());
dto.setDateCreation(item.getDateCreation());
dto.setDateExpedition(item.getDateExpedition());
dto.setRabais(item.getRabais());
dto.setRemiseGlobal(item.getRemiseGlobal());
dto.setTypeRabais(item.getTypeRabais());
dto.setTotalUnites(item.getTotalUnites());
dto.setSousTotal(item.getSousTotal());
dto.setTotal(item.getTotal());
dto.setStatut(item.getStatut());
dto.setFacture(facture? factureConverter.toDto(item.getFacture()): null);
dto.setTaxe(taxe? taxeConverter.toDto(item.getTaxe()): null);
dto.setTaxeExpedition(taxeExpedition? taxeConverter.toDto(item.getTaxeExpedition()): null);
dto.setClient(client? clientConverter.toDto(item.getClient()): null);
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
dto.setNiveauPrix(niveauPrix? niveauPrixConverter.toDto(item.getNiveauPrix()): null);
dto.setAddressFacturation(addressFacturation? adresseConverter.toDto(item.getAddressFacturation()): null);
dto.setAddressExpedition(addressExpedition? adresseConverter.toDto(item.getAddressExpedition()): null);
dto.setCommandeProduit(commandeProduit? commandeProduitConverter.toDto(item.getCommandeProduit()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
}
public void setFacture(boolean value) {
this.facture = value;
}
public void setCommandeExpedition(boolean value) {
this.commandeExpedition = value;
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
public void setCommandeProduit(boolean value) {
this.commandeProduit = value;
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
public void setCommandeProduitConverter(CommandeProduitConverter value) {
this.commandeProduitConverter = value;
}
public CommandeProduitConverter getCommandeProduitConverter() {
return commandeProduitConverter;
}
public void setTaxeConverter(TaxeConverter value) {
this.taxeConverter = value;
}
public TaxeConverter getTaxeConverter() {
return taxeConverter;
}
public void setFactureConverter(FactureConverter value) {
this.factureConverter = value;
}
public FactureConverter getFactureConverter() {
return factureConverter;
}
}