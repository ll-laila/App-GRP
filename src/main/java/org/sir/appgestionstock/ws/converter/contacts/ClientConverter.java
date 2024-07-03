package org.sir.appgestionstock.ws.converter.contacts;

import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.ws.converter.ClientProduitNiveauPrixConverter;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.ws.converter.adresse.AdresseConverter;
import org.sir.appgestionstock.ws.converter.parametres.DevisesConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.parametres.TaxeConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClientConverter {
    @Autowired
    private AdresseConverter adresseConverter;
    @Autowired
    private EntrepriseConverter entrepriseConverter;
    @Autowired
    private NiveauPrixConverter niveauPrixConverter;
    @Autowired
    private DevisesConverter devisesConverter;
    @Autowired
    private TaxeConverter taxeConverter;
    @Autowired
    private ClientProduitNiveauPrixConverter clientProduitNiveauPrixConverter;
    private boolean adresse = true;
    private boolean devises = true;
    private boolean niveauPrix = true;
    private boolean taxe = true;
    private boolean entreprise = true;
    private boolean clientProduitNiveauPrix = true;

    protected void configure(boolean value) {
        this.entrepriseConverter.setClients(value);
        this.clientProduitNiveauPrixConverter.setClient(value);
    }

    public final ClientDto toDto(Client item) {
        this.configure(false);
        var dto = item != null ? convertToDto(item) : null;
        this.configure(true);
        return dto;
    }

    public final Client toItem(ClientDto d) {
        return d != null ? convertToItem(d) : null;
    }

    public final List<Client> toItem(List<ClientDto> dtos) {
        if (dtos == null) return null;
        List<Client> list = new ArrayList<>();
        dtos.forEach(it -> list.add(toItem(it)));
        return list;
    }

    public final List<ClientDto> toDto(List<Client> items) {
        if (items == null) return null;
        List<ClientDto> list = new ArrayList<>();
        items.forEach(it -> list.add(toDto(it)));
        return list;
    }

    protected Client convertToItem(ClientDto dto) {
        var item = new Client();
        item.setId(dto.getId());
        item.setNom(dto.getNom());
        item.setCode(dto.getCode());
        item.setEmail(dto.getEmail());
        item.setSiteweb(dto.getSiteweb());
        item.setTelephone(dto.getTelephone());
        item.setTaxeNumero(dto.getTaxeNumero());
        item.setRabais(dto.getRabais());
        item.setLanguePDF(dto.getLanguePDF());
        item.setValeurCommandeMinimale(dto.getValeurCommandeMinimale());
        if (adresse) {
            item.setAdresse(adresseConverter.toItem(dto.getAdresse()));
        }
        if (devises) {
            item.setDevises(devisesConverter.toItem(dto.getDevises()));
        }
        if (niveauPrix) {
            item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
        }
        if (taxe) {
            item.setTaxe(taxeConverter.toItem(dto.getTaxe()));
        }
        if (entreprise) {
            item.setEntreprise(entrepriseConverter.toItem(dto.getEntreprise()));
        }
        if (clientProduitNiveauPrix) {
            item.setClientProduitNiveauPrix(clientProduitNiveauPrixConverter.toItem(dto.getClientProduitNiveauPrixes()));
        }
        return item;
    }

    protected ClientDto convertToDto(Client item) {
        var dto = new ClientDto();
        dto.setId(item.getId());
        dto.setNom(item.getNom());
        dto.setCode(item.getCode());
        dto.setEmail(item.getEmail());
        dto.setSiteweb(item.getSiteweb());
        dto.setTelephone(item.getTelephone());
        dto.setTaxeNumero(item.getTaxeNumero());
        dto.setRabais(item.getRabais());
        dto.setLanguePDF(item.getLanguePDF());
        dto.setValeurCommandeMinimale(item.getValeurCommandeMinimale());
        if (adresse) {
            dto.setAdresse(adresseConverter.toDto(item.getAdresse()));
        }
        if (devises) {
            dto.setDevises(devisesConverter.toDto(item.getDevises()));
        }
        if (niveauPrix) {
            dto.setNiveauPrix(niveauPrixConverter.toDto(item.getNiveauPrix()));
        }
        if (taxe) {
            dto.setTaxe(taxeConverter.toDto(item.getTaxe()));
        }
        if (entreprise) {
            dto.setEntreprise(entrepriseConverter.toDto(item.getEntreprise()));
        }
        if (clientProduitNiveauPrix) {
            dto.setClientProduitNiveauPrixes(clientProduitNiveauPrixConverter.toDto(item.getClientProduitNiveauPrix()));
        }
        return dto;
    }

    public void setAdresse(boolean value) {
        this.adresse = value;
    }

    public void setDevises(boolean value) {
        this.devises = value;
    }

    public void setNiveauPrix(boolean value) {
        this.niveauPrix = value;
    }

    public void setTaxe(boolean value) {
        this.taxe = value;
    }

    public void setEntreprise(boolean value) {
        this.entreprise = value;
    }

    public void setAdresseConverter(AdresseConverter value) {
        this.adresseConverter = value;
    }

    public AdresseConverter getAdresseConverter() {
        return adresseConverter;
    }

    public void setEntrepriseConverter(EntrepriseConverter value) {
        this.entrepriseConverter = value;
    }

    public EntrepriseConverter getEntrepriseConverter() {
        return entrepriseConverter;
    }

    public void setNiveauPrixConverter(NiveauPrixConverter value) {
        this.niveauPrixConverter = value;
    }

    public NiveauPrixConverter getNiveauPrixConverter() {
        return niveauPrixConverter;
    }

    public void setDevisesConverter(DevisesConverter value) {
        this.devisesConverter = value;
    }

    public DevisesConverter getDevisesConverter() {
        return devisesConverter;
    }

    public void setTaxeConverter(TaxeConverter value) {
        this.taxeConverter = value;
    }

    public TaxeConverter getTaxeConverter() {
        return taxeConverter;
    }
}
