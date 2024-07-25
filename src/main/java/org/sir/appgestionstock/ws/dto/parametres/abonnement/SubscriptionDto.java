package org.sir.appgestionstock.ws.dto.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.sir.appgestionstock.zsecurity.entity.AppUser;

import java.util.Date;

public class SubscriptionDto {

    private Long id;
    private Plan plan;
    private AppUser user;
    private Date subscriptionDate;
    private Date subscriptionEndDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Date getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(Date subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }

    public Date getSubscriptionEndDate() {
        return subscriptionEndDate;
    }

    public void setSubscriptionEndDate(Date subscriptionEndDate) {
        this.subscriptionEndDate = subscriptionEndDate;
    }


}
