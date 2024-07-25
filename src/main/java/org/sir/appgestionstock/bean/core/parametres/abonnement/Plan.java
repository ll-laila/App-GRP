package org.sir.appgestionstock.bean.core.parametres.abonnement;


import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private int maxEntreprises;



    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getMaxEntreprises() {
        return maxEntreprises;
    }

    public void setMaxEntreprises(int maxEntreprises) {
        this.maxEntreprises = maxEntreprises;
    }

}
