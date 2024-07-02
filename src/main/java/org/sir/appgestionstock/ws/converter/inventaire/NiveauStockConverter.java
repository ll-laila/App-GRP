package org.sir.appgestionstock.ws.converter.inventaire;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.ws.dto.inventaire.NiveauStockDto;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class NiveauStockConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setNiveauStock(value);
}
public final NiveauStockDto toDto(NiveauStock item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final NiveauStock toItem(NiveauStockDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<NiveauStock> toItem(List<NiveauStockDto> dtos) {
if (dtos == null) return null;
List<NiveauStock> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<NiveauStockDto> toDto(List<NiveauStock> items) {
if (items == null) return null;
List<NiveauStockDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected NiveauStock convertToItem(NiveauStockDto dto) {
var item = new NiveauStock();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setSku(dto.getSku());
item.setDisponible(dto.getDisponible());
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
return item;
}
protected NiveauStockDto convertToDto(NiveauStock item) {
var dto = new NiveauStockDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setSku(item.getSku());
dto.setDisponible(item.getDisponible());
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
return dto;
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
}