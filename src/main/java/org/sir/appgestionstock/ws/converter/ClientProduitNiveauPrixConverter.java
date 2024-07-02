package org.sir.appgestionstock.ws.converter;

import org.sir.appgestionstock.bean.core.ClientProduitNiveauPrix;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.converter.parametres.NiveauPrixConverter;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.sir.appgestionstock.ws.dto.ClientProduitNiveauPrixDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClientProduitNiveauPrixConverter {
    @Autowired
    private ProduitConverter produitConverter;
    @Autowired
        private ClientConverter clientConverter;
    @Autowired
    private NiveauPrixConverter niveauPrixConverter;
    
    private boolean produit = true;
    private boolean client = true;
    private boolean niveauPrix = true;
    protected void configure(boolean value) {
    }

    public final ClientProduitNiveauPrixDto toDto(ClientProduitNiveauPrix item) {
        this.configure(false);
        var dto = item != null ? convertToDto(item) : null;
        this.configure(true);
        return dto;
    }

    public final ClientProduitNiveauPrix toItem(ClientProduitNiveauPrixDto d) {
        return d != null ? convertToItem(d) : null;
    }

    public final List<ClientProduitNiveauPrix> toItem(List<ClientProduitNiveauPrixDto> dtos) {
        if (dtos == null) return null;
        List<ClientProduitNiveauPrix> list = new ArrayList<>();
        dtos.forEach(it -> list.add(toItem(it)));
        return list;
    }

    public final List<ClientProduitNiveauPrixDto> toDto(List<ClientProduitNiveauPrix> items) {
        if (items == null) return null;
        List<ClientProduitNiveauPrixDto> list = new ArrayList<>();
        items.forEach(it -> list.add(toDto(it)));
        return list;
    }

    protected ClientProduitNiveauPrix convertToItem(ClientProduitNiveauPrixDto dto) {
        var item = new ClientProduitNiveauPrix();
        item.setId(dto.getId());
        item.setPrix(dto.getPrix());
        item.setNiveauPrix(niveauPrixConverter.toItem(dto.getNiveauPrix()));
        item.setProduit(produitConverter.toItem(dto.getProduit()));
        item.setClient(clientConverter.toItem(dto.getClient()));

        return item;
    }

    protected ClientProduitNiveauPrixDto convertToDto(ClientProduitNiveauPrix item) {
        var dto = new ClientProduitNiveauPrixDto();
        dto.setId(item.getId());
        item.setPrix(dto.getPrix());
        dto.setNiveauPrix(niveauPrix ? niveauPrixConverter.toDto(item.getNiveauPrix()) : null);
        dto.setProduit(produit ? produitConverter.toDto(item.getProduit()) : null);
        dto.setClient(client ? clientConverter.toDto(item.getClient()) : null);

        return dto;
    }

    public ProduitConverter getProduitConverter() {
        return produitConverter;
    }

    public void setProduitConverter(ProduitConverter produitConverter) {
        this.produitConverter = produitConverter;
    }

    public ClientConverter getClientConverter() {
        return clientConverter;
    }

    public void setClientConverter(ClientConverter clientConverter) {
        this.clientConverter = clientConverter;
    }

    public NiveauPrixConverter getNiveauPrixConverter() {
        return niveauPrixConverter;
    }

    public void setNiveauPrixConverter(NiveauPrixConverter niveauPrixConverter) {
        this.niveauPrixConverter = niveauPrixConverter;
    }

    public boolean isProduit() {
        return produit;
    }

    public void setProduit(boolean produit) {
        this.produit = produit;
    }

    public boolean isClient() {
        return client;
    }

    public void setClient(boolean client) {
        this.client = client;
    }

    public boolean isNiveauPrix() {
        return niveauPrix;
    }

    public void setNiveauPrix(boolean niveauPrix) {
        this.niveauPrix = niveauPrix;
    }
}
