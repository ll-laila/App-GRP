package org.sir.appgestionstock.bean.core.contacts.user;
import org.sir.appgestionstock.bean.core.parametres.Notification;
import org.sir.appgestionstock.ws.dto.contacts.user.PermissionsAccesDto;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="employe")
public class Employe extends AppUser {
private String code;
private String nom;
private String prenom;
private String telephone;

@OneToOne()
private Adresse adresse;
@OneToMany(mappedBy = "employe")
private List<DestinataireEmploye> destinataireEmploye;
@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Notification> notifications;

    @ManyToOne(fetch = FetchType.LAZY)
    private Entreprise entreprise;

    @ManyToMany
    @JoinTable(
            name = "entreprise_employe_acces",
            joinColumns = @JoinColumn(name = "employe_id"),
            inverseJoinColumns = @JoinColumn(name = "entreprise_id")
    )
    private List<Entreprise> entreprisesAdroitAcces;


    @ManyToMany
    @JoinTable(
            name = "employe_permissions_acces",
            joinColumns = @JoinColumn(name = "employe_id"),
            inverseJoinColumns = @JoinColumn(name = "permissionsAcces_id")
    )
    private List<PermissionsAcces> permissionsAcces;

    private String admin;


    public Employe() {
super();
}

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public Employe(Long id, String label) {
// constructor to get optimized fields
this.id = id;
this.code = label;
}
public String getCode() {
return code;
}
public void setCode(String value) {
this.code = value;
}
    public String getAdmin() {
        return admin;
    }
    public void setAdmin(String id) {
        this.admin = id;
    }
public String getNom() {
return nom;
}
public void setNom(String value) {
this.nom = value;
}
public String getPrenom() {
return prenom;
}
public void setPrenom(String value) {
this.prenom = value;
}
public String getTelephone() {
return telephone;
}
public void setTelephone(String value) {
this.telephone = value;
}
public Adresse getAdresse() {
return adresse;
}
public void setAdresse(Adresse value) {
this.adresse = value;
}
public List<DestinataireEmploye> getDestinataireEmploye() {
return destinataireEmploye;
}
public void setDestinataireEmploye(List<DestinataireEmploye> value) {
this.destinataireEmploye = value;
}
public  List<Entreprise>  getEntreprisesAdroitAcces() {
return entreprisesAdroitAcces;
}
public void setEntreprisesAdroitAcces( List<Entreprise>  value) {
this.entreprisesAdroitAcces = value;
}

public  List<PermissionsAcces>  getPermissionsAcces() {
    return permissionsAcces;
}
public void setPermissionsAcces(List<PermissionsAcces>  value) {
    this.permissionsAcces = value;
}


public Entreprise getEntreprise() {
        return entreprise;
    }
public void setEntreprise(Entreprise  value) {
        this.entreprise = value;
    }

@Override
public boolean equals(Object object) {
if (object instanceof Employe employe) {
return employe.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}



}
