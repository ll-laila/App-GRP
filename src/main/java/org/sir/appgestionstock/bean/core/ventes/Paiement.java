package org.sir.appgestionstock.bean.core.ventes;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;
@Entity
@Table(name="paiement")
public class Paiement {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private LocalDate datePaiement;
private double montantPaye;
private double montantRest;
@ManyToOne(fetch = FetchType.LAZY)
private MethodePaiement methodePaiement;
@ManyToOne(fetch = FetchType.LAZY)
private Entreprise entreprise;

private Long idFacture;

private Long idEntreprise;


public Paiement() {
}



    public Long getIdFacture() {
        return idFacture;
    }
    public void setIdFacture(Long id) {
        this.idFacture = id;
    }

    public Long getIdEntreprise() {
        return idEntreprise;
    }
    public void setIdEntreprise(Long id) {
        this.idEntreprise = id;
    }

    public double getMontantRest() {
        return montantRest;
    }

    public void setMontantRest(double montantRest) {
        this.montantRest = montantRest;
    }

    public Long getId() {
return id;
}
public void setId(Long id) {
this.id = id;
}
public LocalDate getDatePaiement() {
return datePaiement;
}
public void setDatePaiement(LocalDate value) {
this.datePaiement = value;
}
public double getMontantPaye() {
return montantPaye;
}
public void setMontantPaye(double value) {
this.montantPaye = value;
}
public MethodePaiement getMethodePaiement() {
return methodePaiement;
}
public void setMethodePaiement(MethodePaiement value) {
this.methodePaiement = value;
}
public Entreprise getEntreprise() {
return entreprise;
}
public void setEntreprise(Entreprise value) {
this.entreprise = value;
}
@Override
public boolean equals(Object object) {
if (object instanceof Paiement paiement) {
return paiement.getId().equals(this.getId());
}
return false;
}
@Override
public int hashCode() {return (id == null) ? 0 : id.hashCode();}
}
