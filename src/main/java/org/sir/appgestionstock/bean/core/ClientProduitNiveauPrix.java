package org.sir.appgestionstock.bean.core;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.produit.Produit;

@Entity
public class ClientProduitNiveauPrix {
    @Id
    private Long id ;
    private int prix;
    @ManyToOne(fetch = FetchType.LAZY)
    private Produit produit;
    @ManyToOne(fetch = FetchType.LAZY)
    private NiveauPrix niveauPrix;

    @ManyToOne(fetch = FetchType.LAZY)
    private Client client;
    @ManyToOne(fetch = FetchType.LAZY)
    private Entreprise entreprise;


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

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public NiveauPrix getNiveauPrix() {
        return niveauPrix;
    }

    public void setNiveauPrix(NiveauPrix niveauPrix) {
        this.niveauPrix = niveauPrix;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
