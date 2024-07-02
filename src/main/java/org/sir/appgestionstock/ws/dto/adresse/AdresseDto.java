package org.sir.appgestionstock.ws.dto.adresse;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdresseDto {
private Long id;
private String address1;
private String address2;
private String postalCode;
private String city;
private PaysDto pays;
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public String getAddress1() {
return address1;
}
public void setAddress1(String value) {
this.address1 = value;
}
public String getAddress2() {
return address2;
}
public void setAddress2(String value) {
this.address2 = value;
}
public String getPostalCode() {
return postalCode;
}
public void setPostalCode(String value) {
this.postalCode = value;
}
public String getCity() {
return city;
}
public void setCity(String value) {
this.city = value;
}
public PaysDto getPays() {
return pays;
}
public void setPays(PaysDto value) {
this.pays = value;
}
}