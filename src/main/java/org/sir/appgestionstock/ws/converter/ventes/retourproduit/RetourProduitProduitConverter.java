package org.sir.appgestionstock.ws.converter.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitProduitDto;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class RetourProduitProduitConverter {
@Autowired private RetourProduitConverter retourProduitConverter;
@Autowired private ProduitConverter produitConverter;
private boolean produit = true;
private boolean retourProduit = true;
protected void configure(boolean value) {
this.retourProduitConverter.setRetourProduitProduit(value);
this.produitConverter.setRetourProduitProduit(value);
}
public final RetourProduitProduitDto toDto(RetourProduitProduit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final RetourProduitProduit toItem(RetourProduitProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<RetourProduitProduit> toItem(List<RetourProduitProduitDto> dtos) {
if (dtos == null) return null;
List<RetourProduitProduit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<RetourProduitProduitDto> toDto(List<RetourProduitProduit> items) {
if (items == null) return null;
List<RetourProduitProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected RetourProduitProduit convertToItem(RetourProduitProduitDto dto) {
var item = new RetourProduitProduit();
item.setId(dto.getId());
item.setQuantite(dto.getQuantite());
item.setCout(dto.getCout());
item.setProduit(produitConverter.toItem(dto.getProduit()));
item.setRetourProduit(retourProduitConverter.toItem(dto.getRetourProduit()));
return item;
}
protected RetourProduitProduitDto convertToDto(RetourProduitProduit item) {
var dto = new RetourProduitProduitDto();
dto.setId(item.getId());
dto.setQuantite(item.getQuantite());
dto.setCout(item.getCout());
dto.setProduit(produit? produitConverter.toDto(item.getProduit()): null);
dto.setRetourProduit(retourProduit? retourProduitConverter.toDto(item.getRetourProduit()): null);
return dto;
}
public void setProduit(boolean value) {
this.produit = value;
}
public void setRetourProduit(boolean value) {
this.retourProduit = value;
}
public void setRetourProduitConverter(RetourProduitConverter value) {
this.retourProduitConverter = value;
}
public RetourProduitConverter getRetourProduitConverter() {
return retourProduitConverter;
}
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
}