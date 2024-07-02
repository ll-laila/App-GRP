package org.sir.appgestionstock.ws.converter.adresse;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.ws.dto.adresse.AdresseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class AdresseConverter {
@Autowired private PaysConverter paysConverter;
private boolean pays = true;
protected void configure(boolean value) {
}
public final AdresseDto toDto(Adresse item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final Adresse toItem(AdresseDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<Adresse> toItem(List<AdresseDto> dtos) {
if (dtos == null) return null;
List<Adresse> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<AdresseDto> toDto(List<Adresse> items) {
if (items == null) return null;
List<AdresseDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected Adresse convertToItem(AdresseDto dto) {
var item = new Adresse();
item.setId(dto.getId());
item.setAddress1(dto.getAddress1());
item.setAddress2(dto.getAddress2());
item.setPostalCode(dto.getPostalCode());
item.setCity(dto.getCity());
item.setPays(paysConverter.toItem(dto.getPays()));
return item;
}
protected AdresseDto convertToDto(Adresse item) {
var dto = new AdresseDto();
dto.setId(item.getId());
dto.setAddress1(item.getAddress1());
dto.setAddress2(item.getAddress2());
dto.setPostalCode(item.getPostalCode());
dto.setCity(item.getCity());
dto.setPays(pays? paysConverter.toDto(item.getPays()): null);
return dto;
}
public void setPays(boolean value) {
this.pays = value;
}
public void setPaysConverter(PaysConverter value) {
this.paysConverter = value;
}
public PaysConverter getPaysConverter() {
return paysConverter;
}
}