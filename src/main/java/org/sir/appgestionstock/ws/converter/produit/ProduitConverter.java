package org.sir.appgestionstock.ws.converter.produit;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.ws.dto.produit.ProduitDto;
import org.sir.appgestionstock.ws.converter.inventaire.NiveauStockConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.ventes.commande.CommandeProduitConverter;
import org.sir.appgestionstock.ws.converter.ventes.facture.FactureProduitConverter;
import org.sir.appgestionstock.ws.converter.ventes.devis.DevisProduitConverter;
import org.sir.appgestionstock.ws.converter.ventes.retourproduit.RetourProduitProduitConverter;
import org.sir.appgestionstock.ws.converter.inventaire.boncommande.BonCommandeProduitConverter;
import org.sir.appgestionstock.ws.converter.inventaire.livraison.LivraisonProduitConverter;
import org.sir.appgestionstock.ws.converter.contacts.FournisseurConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class ProduitConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private NiveauStockConverter niveauStockConverter;
@Autowired private ProduitNiveauPrixConverter produitNiveauPrixConverter;
@Autowired private FactureProduitConverter factureProduitConverter;
@Autowired private DevisProduitConverter devisProduitConverter;
@Autowired private BonCommandeProduitConverter bonCommandeProduitConverter;
@Autowired private RetourProduitProduitConverter retourProduitProduitConverter;
@Autowired private FournisseurConverter fournisseurConverter;
@Autowired private LivraisonProduitConverter livraisonProduitConverter;
@Autowired private DevisesConverter devisesConverter;
@Autowired private CommandeProduitConverter commandeProduitConverter;
@Autowired private TaxeConverter taxeConverter;
private boolean niveauStock = true;
private boolean devises = true;
private boolean taxe = true;
private boolean produitNiveauPrix = true;
private boolean estimationProduit = true;
private boolean commandeProduit = true;
private boolean factureProduit = true;
private boolean devisProduit = true;
private boolean retourProduitProduit = true;
private boolean noteCreditProduit = true;
private boolean remboursementProduit = true;
private boolean bonCommandeProduit = true;
private boolean livraisonProduit = true;
private boolean fournisseur = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setProduits(value);
this.produitNiveauPrixConverter.setProduit(value);
this.factureProduitConverter.setProduit(value);
this.devisProduitConverter.setProduit(value);
this.bonCommandeProduitConverter.setProduit(value);
this.retourProduitProduitConverter.setProduit(value);
this.fournisseurConverter.setProduits(value);
this.livraisonProduitConverter.setProduit(value);
this.commandeProduitConverter.setProduit(value);
}
public final ProduitDto toDto(Produit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Produit toItem(ProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Produit> toItem(List<ProduitDto> dtos) {
if (dtos == null) return null;
List<Produit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<ProduitDto> toDto(List<Produit> items) {
if (items == null) return null;
List<ProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Produit convertToItem(ProduitDto dto) {
var item = new Produit();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setSku(dto.getSku());
item.setBarcode(dto.getBarcode());
item.setCoutInitial(dto.getCoutInitial());
item.setQuantiteMinimumCommandeClient(dto.getQuantiteMinimumCommandeClient());
item.setNiveauStockInitial(dto.getNiveauStockInitial());
item.setEmplacementDeBac(dto.getEmplacementDeBac());
item.setPointCommande(dto.getPointCommande());
item.setPrixGros(dto.getPrixGros());
item.setPrixDetailRecommande(dto.getPrixDetailRecommande());
item.setPrixAchat(dto.getPrixAchat());
item.setDisponible(dto.getDisponible());
item.setNiveauStock(niveauStockConverter.toItem(dto.getNiveauStock()));
item.setDevises(devisesConverter.toItem(dto.getDevises()));
item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
item.setProduitNiveauPrix(produitNiveauPrixConverter.toItem(dto.getProduitNiveauPrix()));
item.setCommandeProduit(commandeProduitConverter.toItem(dto.getCommandeProduit()));
item.setFactureProduit(factureProduitConverter.toItem(dto.getFactureProduit()));
item.setDevisProduit(devisProduitConverter.toItem(dto.getDevisProduit()));
item.setRetourProduitProduit(retourProduitProduitConverter.toItem(dto.getRetourProduitProduit()));
item.setBonCommandeProduit(bonCommandeProduitConverter.toItem(dto.getBonCommandeProduit()));
item.setLivraisonProduit(livraisonProduitConverter.toItem(dto.getLivraisonProduit()));
item.setFournisseur(fournisseurConverter.toItem(dto.getFournisseur()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected ProduitDto convertToDto(Produit item) {
var dto = new ProduitDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setSku(item.getSku());
dto.setBarcode(item.getBarcode());
dto.setCoutInitial(item.getCoutInitial());
dto.setQuantiteMinimumCommandeClient(item.getQuantiteMinimumCommandeClient());
dto.setNiveauStockInitial(item.getNiveauStockInitial());
dto.setEmplacementDeBac(item.getEmplacementDeBac());
dto.setPointCommande(item.getPointCommande());
dto.setPrixGros(item.getPrixGros());
dto.setPrixDetailRecommande(item.getPrixDetailRecommande());
dto.setPrixAchat(item.getPrixAchat());
dto.setDisponible(item.getDisponible());
dto.setNiveauStock(niveauStock? niveauStockConverter.toDto(item.getNiveauStock()): null);
dto.setDevises(devises? devisesConverter.toDto(item.getDevises()): null);
dto.setTaxe(taxe? taxeConverter.toDto(item.getTaxe()): null);
dto.setProduitNiveauPrix(produitNiveauPrix? produitNiveauPrixConverter.toDto(item.getProduitNiveauPrix()): null);
dto.setCommandeProduit(commandeProduit? commandeProduitConverter.toDto(item.getCommandeProduit()): null);
dto.setFactureProduit(factureProduit? factureProduitConverter.toDto(item.getFactureProduit()): null);
dto.setDevisProduit(devisProduit? devisProduitConverter.toDto(item.getDevisProduit()): null);
dto.setRetourProduitProduit(retourProduitProduit? retourProduitProduitConverter.toDto(item.getRetourProduitProduit()): null);
dto.setBonCommandeProduit(bonCommandeProduit? bonCommandeProduitConverter.toDto(item.getBonCommandeProduit()): null);
dto.setLivraisonProduit(livraisonProduit? livraisonProduitConverter.toDto(item.getLivraisonProduit()): null);
dto.setFournisseur(fournisseur? fournisseurConverter.toDto(item.getFournisseur()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
}
public void setNiveauStock(boolean value) {
this.niveauStock = value;
}
public void setDevises(boolean value) {
this.devises = value;
}
public void setTaxe(boolean value) {
this.taxe = value;
}
public void setProduitNiveauPrix(boolean value) {
this.produitNiveauPrix = value;
}
public void setEstimationProduit(boolean value) {
this.estimationProduit = value;
}
public void setCommandeProduit(boolean value) {
this.commandeProduit = value;
}
public void setFactureProduit(boolean value) {
this.factureProduit = value;
}
public void setDevisProduit(boolean value) {
this.devisProduit = value;
}
public void setRetourProduitProduit(boolean value) {
this.retourProduitProduit = value;
}
public void setNoteCreditProduit(boolean value) {
this.noteCreditProduit = value;
}
public void setRemboursementProduit(boolean value) {
this.remboursementProduit = value;
}
public void setBonCommandeProduit(boolean value) {
this.bonCommandeProduit = value;
}
public void setLivraisonProduit(boolean value) {
this.livraisonProduit = value;
}
public void setFournisseur(boolean value) {
this.fournisseur = value;
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
public void setNiveauStockConverter(NiveauStockConverter value) {
this.niveauStockConverter = value;
}
public NiveauStockConverter getNiveauStockConverter() {
return niveauStockConverter;
}
public void setProduitNiveauPrixConverter(ProduitNiveauPrixConverter value) {
this.produitNiveauPrixConverter = value;
}
public ProduitNiveauPrixConverter getProduitNiveauPrixConverter() {
return produitNiveauPrixConverter;
}
public void setFactureProduitConverter(FactureProduitConverter value) {
this.factureProduitConverter = value;
}
public FactureProduitConverter getFactureProduitConverter() {
return factureProduitConverter;
}
public void setDevisProduitConverter(DevisProduitConverter value) {
this.devisProduitConverter = value;
}
public DevisProduitConverter getDevisProduitConverter() {
return devisProduitConverter;
}
public void setBonCommandeProduitConverter(BonCommandeProduitConverter value) {
this.bonCommandeProduitConverter = value;
}
public BonCommandeProduitConverter getBonCommandeProduitConverter() {
return bonCommandeProduitConverter;
}
public void setRetourProduitProduitConverter(RetourProduitProduitConverter value) {
this.retourProduitProduitConverter = value;
}
public RetourProduitProduitConverter getRetourProduitProduitConverter() {
return retourProduitProduitConverter;
}
public void setFournisseurConverter(FournisseurConverter value) {
this.fournisseurConverter = value;
}
public FournisseurConverter getFournisseurConverter() {
return fournisseurConverter;
}
public void setLivraisonProduitConverter(LivraisonProduitConverter value) {
this.livraisonProduitConverter = value;
}
public LivraisonProduitConverter getLivraisonProduitConverter() {
return livraisonProduitConverter;
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
}