package org.sir.appgestionstock.bean.core.parametres.abonnement;


import jakarta.persistence.*;
import lombok.Getter;


@Getter
@Entity
@Table(name="plan")

public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private int maxEntreprises;
    private String description;


    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setMaxEntreprises(int maxEntreprises) {
        this.maxEntreprises = maxEntreprises;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
