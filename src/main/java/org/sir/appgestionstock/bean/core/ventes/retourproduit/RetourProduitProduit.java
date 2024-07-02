package org.sir.appgestionstock.bean.core.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.produit.Produit;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
/**
* This Class is for Association between 'RetourProduit' and 'Produit'
*/
@Entity
@Table(name="retourproduitproduit")
public class RetourProduitProduit {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private int quantite;
private float cout;
@ManyToOne(fetch = FetchType.LAZY)
private Produit produit;
@ManyToOne(fetch = FetchType.LAZY)
private RetourProduit retourProduit;
public RetourProduitProduit() {
}
public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public int getQuantite() {
return quantite;
}
public void setQuantite(int value) {
this.quantite = value;
}
public float getCout() {
return cout;
}
public void setCout(float value) {
this.cout = value;
}
public Produit getProduit() {
return produit;
}
public void setProduit(Produit value) {
this.produit = value;
}
public RetourProduit getRetourProduit() {
return retourProduit;
}
public void setRetourProduit(RetourProduit value) {
this.retourProduit = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof RetourProduitProduit retourProduitProduit) {
return retourProduitProduit.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}