package org.sir.appgestionstock.ws.converter.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonProduitDto;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class LivraisonProduitConverter {
@Autowired private LivraisonConverter livraisonConverter;
@Autowired private ProduitConverter produitConverter;
private boolean produit = true;
private boolean livraison = true;
protected void configure(boolean value) {
this.livraisonConverter.setLivraisonProduit(value);
this.produitConverter.setLivraisonProduit(value);
}
public final LivraisonProduitDto toDto(LivraisonProduit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final LivraisonProduit toItem(LivraisonProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<LivraisonProduit> toItem(List<LivraisonProduitDto> dtos) {
if (dtos == null) return null;
List<LivraisonProduit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<LivraisonProduitDto> toDto(List<LivraisonProduit> items) {
if (items == null) return null;
List<LivraisonProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected LivraisonProduit convertToItem(LivraisonProduitDto dto) {
var item = new LivraisonProduit();
item.setId(dto.getId());
item.setTotal(dto.getTotal());
item.setQuantite(dto.getQuantite());
item.setDisque(dto.getDisque());
item.setProduit(produitConverter.toItem(dto.getProduit()));
item.setLivraison(livraisonConverter.toItem(dto.getLivraison()));
item.setPrix(dto.getPrix());
return item;
}
protected LivraisonProduitDto convertToDto(LivraisonProduit item) {
var dto = new LivraisonProduitDto();
dto.setId(item.getId());
dto.setTotal(item.getTotal());
dto.setQuantite(item.getQuantite());
dto.setDisque(item.getDisque());
dto.setProduit(produit? produitConverter.toDto(item.getProduit()): null);
dto.setLivraison(livraison? livraisonConverter.toDto(item.getLivraison()): null);
dto.setPrix(item.getPrix());
return dto;
}
public void setProduit(boolean value) {
this.produit = value;
}
public void setLivraison(boolean value) {
this.livraison = value;
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
}