package org.sir.appgestionstock.ws.dto.parametres;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.contacts.user.EmployeDto;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DestinataireEmployeDto {
private Long id;
private EmployeDto employe;
private AlerteDto alerte;
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public EmployeDto getEmploye() {
return employe;
}
public void setEmploye(EmployeDto value) {
this.employe = value;
}
public AlerteDto getAlerte() {
return alerte;
}
public void setAlerte(AlerteDto value) {
this.alerte = value;
}
}