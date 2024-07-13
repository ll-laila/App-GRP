package org.sir.appgestionstock.ws.dto.ventes.commande;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.produit.ProduitDto;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommandeProduitDto {
private Long id;
private double total;
private int quantite;
private double disque;
private ProduitDto produit;
private CommandeDto commande;
    private double prix;
    private double disponible;
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
public ProduitDto getProduit() {
return produit;
}
public void setProduit(ProduitDto value) {
this.produit = value;
}
public CommandeDto getCommande() {
return commande;
}
public void setCommande(CommandeDto value) {
this.commande = value;
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
}