package org.sir.appgestionstock.bean.core.adresse;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="adresse")
public class Adresse {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String address1;
private String address2;
private String postalCode;
private String city;
@ManyToOne(fetch = FetchType.LAZY)
private Pays pays;
public Adresse() {
}
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
public Pays getPays() {
return pays;
}
public void setPays(Pays value) {
this.pays = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof Adresse adresse) {
return adresse.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}