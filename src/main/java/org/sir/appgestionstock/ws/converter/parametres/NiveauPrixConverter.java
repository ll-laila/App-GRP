package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.ws.dto.parametres.NiveauPrixDto;
import org.sir.appgestionstock.ws.converter.produit.ProduitNiveauPrixConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class NiveauPrixConverter {
@Autowired private ProduitNiveauPrixConverter produitNiveauPrixConverter;
private boolean produitNiveauPrix = true;
protected void configure(boolean value) {
this.produitNiveauPrixConverter.setNiveauPrix(value);
}
public final NiveauPrixDto toDto(NiveauPrix item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final NiveauPrix toItem(NiveauPrixDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<NiveauPrix> toItem(List<NiveauPrixDto> dtos) {
if (dtos == null) return null;
List<NiveauPrix> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<NiveauPrixDto> toDto(List<NiveauPrix> items) {
if (items == null) return null;
List<NiveauPrixDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected NiveauPrix convertToItem(NiveauPrixDto dto) {
var item = new NiveauPrix();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setType(dto.getType());
item.setActif(dto.isActif());
item.setProduitNiveauPrix(produitNiveauPrixConverter.toItem(dto.getProduitNiveauPrix()));
item.setIdEntreprise(dto.getIdEntreprise());
return item;
}
protected NiveauPrixDto convertToDto(NiveauPrix item) {
var dto = new NiveauPrixDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setType(item.getType());
dto.setActif(item.isActif());
dto.setProduitNiveauPrix(produitNiveauPrix? produitNiveauPrixConverter.toDto(item.getProduitNiveauPrix()): null);
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
}
public void setProduitNiveauPrix(boolean value) {
this.produitNiveauPrix = value;
}
public void setProduitNiveauPrixConverter(ProduitNiveauPrixConverter value) {
this.produitNiveauPrixConverter = value;
}
public ProduitNiveauPrixConverter getProduitNiveauPrixConverter() {
return produitNiveauPrixConverter;
}
}