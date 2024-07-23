package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.contacts.user.EmployeConverter;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.contacts.FournisseurConverter;
import org.sir.appgestionstock.ws.converter.ventes.PaiementConverter;
import org.sir.appgestionstock.ws.converter.inventaire.livraison.LivraisonConverter;
import org.sir.appgestionstock.ws.converter.inventaire.boncommande.BonCommandeConverter;
import org.sir.appgestionstock.ws.converter.inventaire.NiveauStockConverter;
import org.sir.appgestionstock.ws.converter.ventes.retourproduit.RetourProduitConverter;
import org.sir.appgestionstock.ws.converter.ventes.facture.FactureConverter;
import org.sir.appgestionstock.ws.converter.ventes.commande.CommandeConverter;
import org.sir.appgestionstock.ws.converter.ventes.devis.DevisConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class EntrepriseConverter {
@Autowired private AdresseConverter adresseConverter;
@Autowired private PaiementConverter paiementConverter;
@Autowired private NiveauStockConverter niveauStockConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private RetourProduitConverter retourProduitConverter;
@Autowired private CommandeConverter commandeConverter;
@Autowired private LivraisonConverter livraisonConverter;
@Autowired private ProduitConverter produitConverter;
@Autowired private DevisConverter devisConverter;
@Autowired private FournisseurConverter fournisseurConverter;
@Autowired private NouvelleDeviseConverter nouvelleDeviseConverter;
@Autowired private EmployeConverter employeConverter;
@Autowired private ClientConverter clientConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private BonCommandeConverter bonCommandeConverter;
@Autowired private FactureConverter factureConverter;
@Autowired private EntrepriseDevisesConverter entrepriseDevisesConverter;

private boolean adresse = true;
private boolean employes = true;
private boolean produits = true;
private boolean clients = true;
private boolean fournisseurs = true;
private boolean paiement = true;
private boolean commandeExpedition = true;
private boolean livraison = true;
private boolean bonCommande = true;
private boolean niveauStock = true;
private boolean remboursement = true;
private boolean noteCredit = true;
private boolean retourProduit = true;
private boolean facture = true;
private boolean commande = true;
private boolean estimation = true;
private boolean devisesList = true;
private boolean nouvelleDevises = true;
private boolean devisList = true;
private boolean entrepriseDevises = true;

protected void configure(boolean value) {
this.paiementConverter.setEntreprise(value);
this.niveauStockConverter.setEntreprise(value);
this.retourProduitConverter.setEntreprise(value);
this.commandeConverter.setEntreprise(value);
this.livraisonConverter.setEntreprise(value);
this.produitConverter.setEntreprise(value);
this.devisConverter.setEntreprise(value);
this.fournisseurConverter.setEntreprise(value);
this.nouvelleDeviseConverter.setEntreprise(value);
this.employeConverter.setEntreprise(value);
this.clientConverter.setEntreprise(value);
this.devisesConverter.setEntreprise(value);
this.bonCommandeConverter.setEntreprise(value);
this.factureConverter.setEntreprise(value);
this.entrepriseDevisesConverter.setEntreprise(value);
}
public final EntrepriseDto toDto(Entreprise item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Entreprise toItem(EntrepriseDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Entreprise> toItem(List<EntrepriseDto> dtos) {
if (dtos == null) return null;
List<Entreprise> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<EntrepriseDto> toDto(List<Entreprise> items) {
if (items == null) return null;
List<EntrepriseDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Entreprise convertToItem(EntrepriseDto dto) {
var item = new Entreprise();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setEmail(dto.getEmail());
item.setTelephone(dto.getTelephone());
item.setSiteweb(dto.getSiteweb());
item.setLogo(dto.getLogo());
item.setIdAdmin(dto.getIdAdmin());
item.setAdresse(adresseConverter.toItem(dto.getAdresse()));
item.setEmployes(employeConverter.toItem(dto.getEmployes()));
item.setProduits(produitConverter.toItem(dto.getProduits()));
item.setClients(clientConverter.toItem(dto.getClients()));
item.setFournisseurs(fournisseurConverter.toItem(dto.getFournisseurs()));
item.setPaiement(paiementConverter.toItem(dto.getPaiement()));
item.setLivraison(livraisonConverter.toItem(dto.getLivraison()));
item.setBonCommande(bonCommandeConverter.toItem(dto.getBonCommande()));
item.setNiveauStock(niveauStockConverter.toItem(dto.getNiveauStock()));
item.setRetourProduit(retourProduitConverter.toItem(dto.getRetourProduit()));
item.setFacture(factureConverter.toItem(dto.getFacture()));
item.setCommande(commandeConverter.toItem(dto.getCommande()));
item.setDevisesList(devisesConverter.toItem(dto.getDevisesList()));
item.setNouvelleDevises(nouvelleDeviseConverter.toItem(dto.getNouvelleDevises()));
item.setDevisList(devisConverter.toItem(dto.getDevisList()));
item.setEntrepriseDevises(entrepriseDevisesConverter.toItem(dto.getEntrepriseDevises()));
return item;
}
protected EntrepriseDto convertToDto(Entreprise item) {
var dto = new EntrepriseDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setEmail(item.getEmail());
dto.setTelephone(item.getTelephone());
dto.setSiteweb(item.getSiteweb());
dto.setLogo(item.getLogo());
dto.setIdAdmin(item.getIdAdmin());
dto.setAdresse(adresse? adresseConverter.toDto(item.getAdresse()): null);
dto.setEmployes(employes? employeConverter.toDto(item.getEmployes()): null);
dto.setProduits(produits? produitConverter.toDto(item.getProduits()): null);
dto.setClients(clients? clientConverter.toDto(item.getClients()): null);
dto.setFournisseurs(fournisseurs? fournisseurConverter.toDto(item.getFournisseurs()): null);
dto.setPaiement(paiement? paiementConverter.toDto(item.getPaiement()): null);
dto.setLivraison(livraison? livraisonConverter.toDto(item.getLivraison()): null);
dto.setBonCommande(bonCommande? bonCommandeConverter.toDto(item.getBonCommande()): null);
dto.setNiveauStock(niveauStock? niveauStockConverter.toDto(item.getNiveauStock()): null);
dto.setRetourProduit(retourProduit? retourProduitConverter.toDto(item.getRetourProduit()): null);
dto.setFacture(facture? factureConverter.toDto(item.getFacture()): null);
dto.setCommande(commande? commandeConverter.toDto(item.getCommande()): null);
dto.setDevisesList(devisesList? devisesConverter.toDto(item.getDevisesList()): null);
dto.setNouvelleDevises(nouvelleDevises? nouvelleDeviseConverter.toDto(item.getNouvelleDevises()): null);
dto.setDevisList(devisList? devisConverter.toDto(item.getDevisList()): null);
dto.setEntrepriseDevises(entrepriseDevises? entrepriseDevisesConverter.toDto(item.getEntrepriseDevises()): null);
return dto;
}
public void setAdresse(boolean value) {
this.adresse = value;
}
public void setEmployes(boolean value) {
this.employes = value;
}
public void setProduits(boolean value) {
this.produits = value;
}
public void setClients(boolean value) {
this.clients = value;
}
public void setFournisseurs(boolean value) {
this.fournisseurs = value;
}
public void setPaiement(boolean value) {
this.paiement = value;
}
public void setCommandeExpedition(boolean value) {
this.commandeExpedition = value;
}
public void setLivraison(boolean value) {
this.livraison = value;
}
public void setBonCommande(boolean value) {
this.bonCommande = value;
}
public void setNiveauStock(boolean value) {
this.niveauStock = value;
}
public void setRemboursement(boolean value) {
this.remboursement = value;
}
public void setNoteCredit(boolean value) {
this.noteCredit = value;
}
public void setRetourProduit(boolean value) {
this.retourProduit = value;
}
public void setFacture(boolean value) {
this.facture = value;
}
public void setCommande(boolean value) {
this.commande = value;
}
public void setEstimation(boolean value) {
this.estimation = value;
}
public void setDevisesList(boolean value) {
this.devisesList = value;
}
public void setNouvelleDevises(boolean value) {
this.nouvelleDevises = value;
}
public void setDevisList(boolean value) {
this.devisList = value;
}
public void setEntrepriseDevises(boolean value) {
this.entrepriseDevises = value;
}

public void setAdresseConverter(AdresseConverter value) {
this.adresseConverter = value;
}
public AdresseConverter getAdresseConverter() {
return adresseConverter;
}
public void setPaiementConverter(PaiementConverter value) {
this.paiementConverter = value;
}
public PaiementConverter getPaiementConverter() {
return paiementConverter;
}
public void setNiveauStockConverter(NiveauStockConverter value) {
this.niveauStockConverter = value;
}
public NiveauStockConverter getNiveauStockConverter() {
return niveauStockConverter;
}
public void setRetourProduitConverter(RetourProduitConverter value) {
this.retourProduitConverter = value;
}
public RetourProduitConverter getRetourProduitConverter() {
return retourProduitConverter;
}
public void setCommandeConverter(CommandeConverter value) {
this.commandeConverter = value;
}
public CommandeConverter getCommandeConverter() {
return commandeConverter;
}
public void setLivraisonConverter(LivraisonConverter value) {
this.livraisonConverter = value;
}
public LivraisonConverter getLivraisonConverter() {
return livraisonConverter;
}
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
public void setDevisConverter(DevisConverter value) {
this.devisConverter = value;
}
public DevisConverter getDevisConverter() {
return devisConverter;
}
public void setFournisseurConverter(FournisseurConverter value) {
this.fournisseurConverter = value;
}
public FournisseurConverter getFournisseurConverter() {
return fournisseurConverter;
}
public void setNouvelleDeviseConverter(NouvelleDeviseConverter value) {
this.nouvelleDeviseConverter = value;
}
public NouvelleDeviseConverter getNouvelleDeviseConverter() {
return nouvelleDeviseConverter;
}
public void setEmployeConverter(EmployeConverter value) {
this.employeConverter = value;
}
public EmployeConverter getEmployeConverter() {
return employeConverter;
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
public void setBonCommandeConverter(BonCommandeConverter value) {
this.bonCommandeConverter = value;
}
public BonCommandeConverter getBonCommandeConverter() {
return bonCommandeConverter;
}
public void setFactureConverter(FactureConverter value) {
this.factureConverter = value;
}
public FactureConverter getFactureConverter() {
return factureConverter;
}
public void setEntrepriseDevisesConverter(EntrepriseDevisesConverter value) {
this.entrepriseDevisesConverter = value;
}
public EntrepriseDevisesConverter getEntrepriseDevisesConverter() {
return entrepriseDevisesConverter;
}

}