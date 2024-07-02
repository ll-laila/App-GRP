package org.sir.appgestionstock.ws.converter.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.ws.converter.ventes.facture.FactureConverter;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitDto;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class RetourProduitConverter {
@Autowired private EntrepriseConverter entrepriseConverter;
@Autowired private ClientConverter clientConverter;
@Autowired private RetourProduitProduitConverter retourProduitProduitConverter;
@Autowired private FactureConverter factureConverter;
private boolean client = true;
private boolean noteCredit = true;
private boolean remboursements = true;
private boolean facture = true;
private boolean retourProduitProduit = true;
private boolean entreprise = true;
protected void configure(boolean value) {
this.entrepriseConverter.setRetourProduit(value);
this.retourProduitProduitConverter.setRetourProduit(value);
}
public final RetourProduitDto toDto(RetourProduit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final RetourProduit toItem(RetourProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<RetourProduit> toItem(List<RetourProduitDto> dtos) {
if (dtos == null) return null;
List<RetourProduit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<RetourProduitDto> toDto(List<RetourProduit> items) {
if (items == null) return null;
List<RetourProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected RetourProduit convertToItem(RetourProduitDto dto) {
var item = new RetourProduit();
item.setId(dto.getId());
item.setCode(dto.getCode());
item.setStatut(dto.getStatut());
item.setClient(clientConverter.toItem(dto.getClient()));
item.setRetourProduitProduit(retourProduitProduitConverter.toItem(dto.getRetourProduitProduit()));
item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
item.setFacture(factureConverter.toItem(dto.getFacture()));
return item;
}
protected RetourProduitDto convertToDto(RetourProduit item) {
var dto = new RetourProduitDto();
dto.setId(item.getId());
dto.setCode(item.getCode());
dto.setStatut(item.getStatut());
dto.setClient(client? clientConverter.toDto(item.getClient()): null);
dto.setRetourProduitProduit(retourProduitProduit? retourProduitProduitConverter.toDto(item.getRetourProduitProduit()): null);
dto.setEntreprise(entreprise? entrepriseConverter.toDto(item.getEntreprise()): null);
dto.setFacture(facture? factureConverter.toDto(item.getFacture()): null);
return dto;
}
public void setClient(boolean value) {
this.client = value;
}
public void setNoteCredit(boolean value) {
this.noteCredit = value;
}
public void setRemboursements(boolean value) {
this.remboursements = value;
}
public void setRetourProduitProduit(boolean value) {
this.retourProduitProduit = value;
}
public void setEntreprise(boolean value) {
this.entreprise = value;
}
public void setEntrepriseConverter(EntrepriseConverter value) {
this.entrepriseConverter = value;
}
public EntrepriseConverter getEntrepriseConverter() {
return entrepriseConverter;
}
public void setClientConverter(ClientConverter value) {
this.clientConverter = value;
}
public ClientConverter getClientConverter() {
return clientConverter;
}
public void setRetourProduitProduitConverter(RetourProduitProduitConverter value) {
this.retourProduitProduitConverter = value;
}
public RetourProduitProduitConverter getRetourProduitProduitConverter() {
return retourProduitProduitConverter;
}

    public boolean isFacture() {
        return facture;
    }

    public void setFacture(boolean facture) {
        this.facture = facture;
    }
}