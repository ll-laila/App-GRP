package org.sir.appgestionstock.ws.dto.parametres.abonnement;

import lombok.Getter;

@Getter
public class PlanDto {

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
