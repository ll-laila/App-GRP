package org.sir.appgestionstock.bean.core.parametres;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
/**
* This Class is for Association between 'Alerte' and 'Employe'
*/
@Entity
@Table(name="destinataireemploye")
public class DestinataireEmploye {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
@ManyToOne(fetch = FetchType.LAZY)
private Employe employe;
@ManyToOne(fetch = FetchType.LAZY)
private Alerte alerte;
public DestinataireEmploye() {
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public Employe getEmploye() {
return employe;
}
public void setEmploye(Employe value) {
this.employe = value;
}
public Alerte getAlerte() {
return alerte;
}
public void setAlerte(Alerte value) {
this.alerte = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof DestinataireEmploye destinataireEmploye) {
return destinataireEmploye.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}