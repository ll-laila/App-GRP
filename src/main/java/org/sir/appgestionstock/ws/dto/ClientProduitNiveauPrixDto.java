package org.sir.appgestionstock.ws.dto;

import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.dao.contacts.ClientDao;
import org.sir.appgestionstock.dao.parametres.NiveauPrixDao;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.NiveauPrixDto;
import org.sir.appgestionstock.ws.dto.produit.ProduitDto;

public class ClientProduitNiveauPrixDto {
    private Long id ;
    private int prix;
    private ProduitDto produit;
    private NiveauPrixDto niveauPrix;

    private ClientDto client;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public ProduitDto getProduit() {
        return produit;
    }

    public void setProduit(ProduitDto produit) {
        this.produit = produit;
    }

    public NiveauPrixDto getNiveauPrix() {
        return niveauPrix;
    }

    public void setNiveauPrix(NiveauPrixDto niveauPrix) {
        this.niveauPrix = niveauPrix;
    }

    public ClientDto getClient() {
        return client;
    }

    public void setClient(ClientDto client) {
        this.client = client;
    }
}

