package org.sir.appgestionstock.bean.core.adresse;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="pays")
public class Pays {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String name;
public Pays() {
}
public Pays(Long id, String label) {
// constructor to get optimized fields
this.id = id;
this.name = label;
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public String getName() {
return name;
}
public void setName(String value) {
this.name = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof Pays pays) {
return pays.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}