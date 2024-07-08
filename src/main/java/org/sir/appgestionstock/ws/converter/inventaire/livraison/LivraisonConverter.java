package org.sir.appgestionstock.ws.converter.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.ws.converter.inventaire.boncommande.BonCommandeConverter;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonDto;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.contacts.FournisseurConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class LivraisonConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private FournisseurConverter fournisseurConverter;
@Autowired private LivraisonProduitConverter livraisonProduitConverter;
@Autowired private TaxeConverter taxeConverter;
@Autowired private BonCommandeConverter bonCommandeConverter;

private boolean taxeExpedition = true;
private boolean fournisseur = true;
private boolean livraisonProduit = true;
private boolean entreprise = true;

protected void configure(boolean value) {
this.entrepriseConverter.setLivraison(value);
this.livraisonProduitConverter.setLivraison(value);
}
public final LivraisonDto toDto(Livraison item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Livraison toItem(LivraisonDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Livraison> toItem(List<LivraisonDto> dtos) {
if (dtos == null) return null;
List<Livraison> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<LivraisonDto> toDto(List<Livraison> items) {
if (items == null) return null;
List<LivraisonDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Livraison convertToItem(LivraisonDto dto) {
var item = new Livraison();
item.setId(dto.getId());
item.setCode(dto.getCode());
item.setDateCreation(dto.getDateCreation());
item.setDateExpedition(dto.getDateExpedition());
item.setRemiseGlobal(dto.getRemiseGlobal());
item.setTotalUnites(dto.getTotalUnites());
item.setSousTotal(dto.getSousTotal());
item.setTotal(dto.getTotal());
item.setStatut(dto.getStatut());
item.setTaxeExpedition(taxeConverter.toItem(dto.getTaxeExpedition()));
item.setFournisseur(fournisseurConverter.toItem(dto.getFournisseur()));
item.setLivraisonProduit(livraisonProduitConverter.toItem(dto.getLivraisonProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
    if (dto.getBonCommande() != null) {
        item.setIdBonCom(dto.getBonCommande().getId());
    } else {
        item.setIdBonCom(null); // ou une valeur par défaut
    }
return item;
}
protected LivraisonDto convertToDto(Livraison item) {
var dto = new LivraisonDto();
dto.setId(item.getId());
dto.setCode(item.getCode());
dto.setDateCreation(item.getDateCreation());
dto.setDateExpedition(item.getDateExpedition());
dto.setRemiseGlobal(item.getRemiseGlobal());
dto.setTotalUnites(item.getTotalUnites());
dto.setSousTotal(item.getSousTotal());
dto.setTotal(item.getTotal());
dto.setStatut(item.getStatut());
dto.setTaxeExpedition(taxeExpedition? taxeConverter.toDto(item.getTaxeExpedition()): null);
dto.setFournisseur(fournisseur? fournisseurConverter.toDto(item.getFournisseur()): null);
dto.setLivraisonProduit(livraisonProduit? livraisonProduitConverter.toDto(item.getLivraisonProduit()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
}

public void setTaxeExpedition(boolean value) {
this.taxeExpedition = value;
}
public void setFournisseur(boolean value) {
this.fournisseur = value;
}
public void setLivraisonProduit(boolean value) {
this.livraisonProduit = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
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
public void setTaxeConverter(TaxeConverter value) {
this.taxeConverter = value;
}
public TaxeConverter getTaxeConverter() {
return taxeConverter;
}
public EntrepriseConverter getEntrepriseConverter() {
        return entrepriseConverter;
    }
public void setFournisseurConverter(FournisseurConverter value) {
        this.fournisseurConverter = value;
    }
}