package org.sir.appgestionstock.ws.converter.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.ws.dto.ventes.devis.DevisProduitDto;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class DevisProduitConverter {
@Autowired private DevisConverter devisConverter;
@Autowired private ProduitConverter produitConverter;
private boolean produit = true;
private boolean devis = true;
protected void configure(boolean value) {
this.devisConverter.setDevisProduit(value);
this.produitConverter.setDevisProduit(value);
}
public final DevisProduitDto toDto(DevisProduit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final DevisProduit toItem(DevisProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<DevisProduit> toItem(List<DevisProduitDto> dtos) {
if (dtos == null) return null;
List<DevisProduit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<DevisProduitDto> toDto(List<DevisProduit> items) {
if (items == null) return null;
List<DevisProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected DevisProduit convertToItem(DevisProduitDto dto) {
var item = new DevisProduit();
item.setId(dto.getId());
item.setTotal(dto.getTotal());
item.setQuantite(dto.getQuantite());
item.setDisque(dto.getDisque());
item.setProduit(produitConverter.toItem(dto.getProduit()));
item.setDevis(devisConverter.toItem(dto.getDevis()));
return item;
}
protected DevisProduitDto convertToDto(DevisProduit item) {
var dto = new DevisProduitDto();
dto.setId(item.getId());
dto.setTotal(item.getTotal());
dto.setQuantite(item.getQuantite());
dto.setDisque(item.getDisque());
dto.setProduit(produit? produitConverter.toDto(item.getProduit()): null);
dto.setDevis(devis? devisConverter.toDto(item.getDevis()): null);
return dto;
}
public void setProduit(boolean value) {
this.produit = value;
}
public void setDevis(boolean value) {
this.devis = value;
}
public void setDevisConverter(DevisConverter value) {
this.devisConverter = value;
}
public DevisConverter getDevisConverter() {
return devisConverter;
}
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
}