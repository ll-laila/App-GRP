package org.sir.appgestionstock.ws.converter.contacts;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.ws.dto.contacts.FournisseurDto;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class FournisseurConverter {
@Autowired private AdresseConverter adresseConverter;
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private TaxeConverter taxeConverter;
@Autowired private ProduitConverter produitConverter;
private boolean adresse = true;
private boolean devises = true;
private boolean niveauPrix = true;
private boolean taxe = true;
private boolean produits = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setFournisseurs(value);
this.produitConverter.setFournisseur(value);
}
public final FournisseurDto toDto(Fournisseur item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Fournisseur toItem(FournisseurDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Fournisseur> toItem(List<FournisseurDto> dtos) {
if (dtos == null) return null;
List<Fournisseur> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<FournisseurDto> toDto(List<Fournisseur> items) {
if (items == null) return null;
List<FournisseurDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Fournisseur convertToItem(FournisseurDto dto) {
var item = new Fournisseur();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setCode(dto.getCode());
item.setEmail(dto.getEmail());
item.setSiteweb(dto.getSiteweb());
item.setTelephone(dto.getTelephone());
item.setAdresse(adresseConverter.toItem(dto.getAdresse()));
item.setTaxeNumero(dto.getTaxeNumero());
item.setRabais(dto.getRabais());
item.setLanguePDF(dto.getLanguePDF());
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setProduits(produitConverter.toItem(dto.getProduits()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected FournisseurDto convertToDto(Fournisseur item) {
var dto = new FournisseurDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setCode(item.getCode());
dto.setEmail(item.getEmail());
dto.setSiteweb(item.getSiteweb());
dto.setTelephone(item.getTelephone());
dto.setAdresse(adresse? adresseConverter.toDto(item.getAdresse()): null);
dto.setTaxeNumero(item.getTaxeNumero());
dto.setRabais(item.getRabais());
dto.setLanguePDF(item.getLanguePDF());
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
dto.setNiveauPrix(niveauPrix? niveauPrixConverter.toDto(item.getNiveauPrix()): null);
dto.setTaxe(taxe? taxeConverter.toDto(item.getTaxe()): null);
dto.setProduits(produits? produitConverter.toDto(item.getProduits()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
}
public void setAdresse(boolean value) {
this.adresse = value;
}
public void setDevises(boolean value) {
this.devises = value;
}
public void setNiveauPrix(boolean value) {
this.niveauPrix = value;
}
public void setTaxe(boolean value) {
this.taxe = value;
}
public void setProduits(boolean value) {
this.produits = value;
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
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
}