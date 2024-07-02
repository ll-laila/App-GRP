package org.sir.appgestionstock.ws.dto.ventes.retourproduit;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureDto;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.bean.enums.StatutRetourProduitEnum;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RetourProduitDto {
private Long id;
private String code;
private StatutRetourProduitEnum statut;
private ClientDto client;
private FactureDto facture;
private List<RetourProduitProduitDto> retourProduitProduit;
private EntrepriseDto entreprise;
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public String getCode() {
return code;
}
public void setCode(String value) {
this.code = value;
}
public StatutRetourProduitEnum getStatut() {
return statut;
}
public void setStatut(StatutRetourProduitEnum value) {
this.statut = value;
}
public ClientDto getClient() {
return client;
}
public void setClient(ClientDto value) {
this.client = value;
}public List<RetourProduitProduitDto> getRetourProduitProduit() {
return retourProduitProduit;
}
public void setRetourProduitProduit(List<RetourProduitProduitDto> value) {
this.retourProduitProduit = value;
}
public EntrepriseDto getEntreprise() {
return entreprise;
}
public void setEntreprise(EntrepriseDto value) {
this.entreprise = value;
}

    public FactureDto getFacture() {
        return facture;
    }

    public void setFacture(FactureDto facture) {
        this.facture = facture;
    }
}