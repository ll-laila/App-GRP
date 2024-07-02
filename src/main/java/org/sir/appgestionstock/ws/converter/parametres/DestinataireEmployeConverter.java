package org.sir.appgestionstock.ws.converter.parametres;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.ws.dto.parametres.DestinataireEmployeDto;
import org.sir.appgestionstock.ws.converter.contacts.user.EmployeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class DestinataireEmployeConverter {
@Autowired private AlerteConverter alerteConverter;
@Autowired private EmployeConverter employeConverter;
private boolean employe = true;
private boolean alerte = true;
protected void configure(boolean value) {
this.alerteConverter.setDestinataireEmploye(value);
this.employeConverter.setDestinataireEmploye(value);
}
public final DestinataireEmployeDto toDto(DestinataireEmploye item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final DestinataireEmploye toItem(DestinataireEmployeDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<DestinataireEmploye> toItem(List<DestinataireEmployeDto> dtos) {
if (dtos == null) return null;
List<DestinataireEmploye> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<DestinataireEmployeDto> toDto(List<DestinataireEmploye> items) {
if (items == null) return null;
List<DestinataireEmployeDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected DestinataireEmploye convertToItem(DestinataireEmployeDto dto) {
var item = new DestinataireEmploye();
item.setId(dto.getId());
item.setEmploye(employeConverter.toItem(dto.getEmploye()));
item.setAlerte(alerteConverter.toItem(dto.getAlerte()));
return item;
}
protected DestinataireEmployeDto convertToDto(DestinataireEmploye item) {
var dto = new DestinataireEmployeDto();
dto.setId(item.getId());
dto.setEmploye(employe? employeConverter.toDto(item.getEmploye()): null);
dto.setAlerte(alerte? alerteConverter.toDto(item.getAlerte()): null);
return dto;
}
public void setEmploye(boolean value) {
this.employe = value;
}
public void setAlerte(boolean value) {
this.alerte = value;
}
public void setAlerteConverter(AlerteConverter value) {
this.alerteConverter = value;
}
public AlerteConverter getAlerteConverter() {
return alerteConverter;
}
public void setEmployeConverter(EmployeConverter value) {
this.employeConverter = value;
}
public EmployeConverter getEmployeConverter() {
return employeConverter;
}
}