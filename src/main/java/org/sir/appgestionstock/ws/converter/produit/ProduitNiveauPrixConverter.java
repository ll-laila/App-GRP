package org.sir.appgestionstock.ws.converter.produit;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.ws.dto.produit.ProduitNiveauPrixDto;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class ProduitNiveauPrixConverter {
@Autowired private NiveauPrixConverter niveauPrixConverter;
@Autowired private ProduitConverter produitConverter;
private boolean produit = true;
private boolean niveauPrix = true;
protected void configure(boolean value) {
this.niveauPrixConverter.setProduitNiveauPrix(value);
this.produitConverter.setProduitNiveauPrix(value);
}
public final ProduitNiveauPrixDto toDto(ProduitNiveauPrix item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final ProduitNiveauPrix toItem(ProduitNiveauPrixDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<ProduitNiveauPrix> toItem(List<ProduitNiveauPrixDto> dtos) {
if (dtos == null) return null;
List<ProduitNiveauPrix> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<ProduitNiveauPrixDto> toDto(List<ProduitNiveauPrix> items) {
if (items == null) return null;
List<ProduitNiveauPrixDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected ProduitNiveauPrix convertToItem(ProduitNiveauPrixDto dto) {
var item = new ProduitNiveauPrix();
item.setId(dto.getId());
item.setPrix(dto.getPrix());
item.setProduit(produitConverter.toItem(dto.getProduit()));
item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
return item;
}
protected ProduitNiveauPrixDto convertToDto(ProduitNiveauPrix item) {
var dto = new ProduitNiveauPrixDto();
dto.setId(item.getId());
dto.setPrix(item.getPrix());
dto.setProduit(produit? produitConverter.toDto(item.getProduit()): null);
dto.setNiveauPrix(niveauPrix? niveauPrixConverter.toDto(item.getNiveauPrix()): null);
return dto;
}
public void setProduit(boolean value) {
this.produit = value;
}
public void setNiveauPrix(boolean value) {
this.niveauPrix = value;
}
public void setNiveauPrixConverter(NiveauPrixConverter value) {
this.niveauPrixConverter = value;
}
public NiveauPrixConverter getNiveauPrixConverter() {
return niveauPrixConverter;
}
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
}