package org.sir.appgestionstock.bean.core.ventes.facture;
import org.sir.appgestionstock.bean.core.produit.Produit;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
/**
* This Class is for Association between 'Produit' and 'Facture'
*/
@Entity
@Table(name="factureproduit")
public class
FactureProduit {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private double total;
private int quantite;
private double disponible;
private double disque;
@ManyToOne(fetch = FetchType.LAZY)
private Produit produit;
@ManyToOne(fetch = FetchType.LAZY)
private Facture facture;
 private double prix;

public FactureProduit() {
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public double getTotal() {
return total;
}
public void setTotal(double value) {
this.total = value;
}
public int getQuantite() {
return quantite;
}
public void setQuantite(int value) {
this.quantite = value;
}
public double getDisque() {
return disque;
}
public void setDisque(double value) {
this.disque = value;
}
public Produit getProduit() {
return produit;
}
public void setProduit(Produit value) {
this.produit = value;
}
public Facture getFacture() {
return facture;
}
public void setFacture(Facture value) {
this.facture = value;
}
    public double getPrix() {
        return prix;
    }
    public void setPrix(double prix) {
        this.prix = prix;
    }

    public double getDisponible() {
        return disponible;
    }

    public void setDisponible(double disponible) {
        this.disponible = disponible;
    }
@Override
public boolean equals(Object object) {
if (object instanceof FactureProduit factureProduit) {
return factureProduit.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}