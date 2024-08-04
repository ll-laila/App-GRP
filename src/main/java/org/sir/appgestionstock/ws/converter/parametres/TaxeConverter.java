package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.ws.dto.parametres.TaxeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class TaxeConverter {
protected void configure(boolean value) {
}
public final TaxeDto toDto(Taxe item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Taxe toItem(TaxeDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Taxe> toItem(List<TaxeDto> dtos) {
if (dtos == null) return null;
List<Taxe> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<TaxeDto> toDto(List<Taxe> items) {
if (items == null) return null;
List<TaxeDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Taxe convertToItem(TaxeDto dto) {
var item = new Taxe();
item.setId(dto.getId());
item.setNom(dto.getNom());
item.setTauxImposition(dto.getTauxImposition());
item.setActif(dto.isActif());
item.setIdEntreprise(dto.getIdEntreprise());
return item;
}
protected TaxeDto convertToDto(Taxe item) {
var dto = new TaxeDto();
dto.setId(item.getId());
dto.setNom(item.getNom());
dto.setTauxImposition(item.getTauxImposition());
dto.setActif(item.isActif());
dto.setIdEntreprise(item.getIdEntreprise());
return dto;
}
}