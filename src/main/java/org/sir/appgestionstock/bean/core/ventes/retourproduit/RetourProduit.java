package org.sir.appgestionstock.bean.core.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.enums.StatutRetourProduitEnum;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="retourproduit")
public class RetourProduit {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String code;
@Enumerated(EnumType.STRING)
private StatutRetourProduitEnum statut;
@ManyToOne(fetch = FetchType.LAZY)
private Client client;
@OneToOne()
private Facture facture;
@OneToMany(mappedBy = "retourProduit")
private List<RetourProduitProduit> retourProduitProduit;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;
public RetourProduit() {
}
public RetourProduit(Long id, String label) {
// constructor to get optimized fields
this.id = id;
this.code = label;
}
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
public Client getClient() {
return client;
}
public void setClient(Client value) {
this.client = value;
}
public List<RetourProduitProduit> getRetourProduitProduit() {
return retourProduitProduit;
}
public void setRetourProduitProduit(List<RetourProduitProduit> value) {
this.retourProduitProduit = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }

    @Override
public boolean equals(Object object) {
if (object instanceof RetourProduit retourProduit) {
return retourProduit.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}