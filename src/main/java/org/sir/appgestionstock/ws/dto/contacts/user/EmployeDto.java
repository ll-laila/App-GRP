package org.sir.appgestionstock.ws.dto.contacts.user;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zsecurity.ws.dto.AppUserDto;
import org.sir.appgestionstock.ws.dto.adresse.AdresseDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.DestinataireEmployeDto;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeDto extends AppUserDto {
private Long id;
private String code;
private String nom;
private String prenom;
private String telephone;
private AdresseDto adresse;
private List<DestinataireEmployeDto> destinataireEmploye;
private EntrepriseDto entreprise;
private List<EntrepriseDto>  entreprisesAdroitAcces;
private List<PermissionsAccesDto> permissionsAcces;
private String admin;


public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
    public String getAdmin() {
        return admin;
    }
    public void setAdmin(String id) {
        this.admin = id;
    }
public String getCode() {
return code;
}
public void setCode(String value) {
this.code = value;
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
public AdresseDto getAdresse() {
return adresse;
}
public void setAdresse(AdresseDto value) {
this.adresse = value;
}
public List<DestinataireEmployeDto> getDestinataireEmploye() {
return destinataireEmploye;
}
public void setDestinataireEmploye(List<DestinataireEmployeDto> value) {
this.destinataireEmploye = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}
public  List<EntrepriseDto>  getEntreprisesAdroitAcces() {
        return entreprisesAdroitAcces;
    }
public void setEntreprisesAdroitAcces( List<EntrepriseDto>  value) {
        this.entreprisesAdroitAcces = value;
    }

public  List<PermissionsAccesDto>  getPermissionsAcces() {
        return permissionsAcces;
    }
public void setPermissionsAcces( List<PermissionsAccesDto>  value) {
        this.permissionsAcces = value;
    }


}