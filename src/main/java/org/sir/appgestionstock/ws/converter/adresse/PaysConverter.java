package org.sir.appgestionstock.ws.converter.adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.sir.appgestionstock.ws.dto.adresse.PaysDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class PaysConverter {
protected void configure(boolean value) {
}
public final PaysDto toDto(Pays item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Pays toItem(PaysDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Pays> toItem(List<PaysDto> dtos) {
if (dtos == null) return null;
List<Pays> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<PaysDto> toDto(List<Pays> items) {
if (items == null) return null;
List<PaysDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Pays convertToItem(PaysDto dto) {
var item = new Pays();
item.setId(dto.getId());
item.setName(dto.getName());
return item;
}
protected PaysDto convertToDto(Pays item) {
var dto = new PaysDto();
dto.setId(item.getId());
dto.setName(item.getName());
return dto;
}
}