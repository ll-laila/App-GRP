package org.sir.appgestionstock.ws.dto.parametres.abonnement;

import lombok.Getter;

@Getter
public class SubResponse {


    public Long daysRemaining;
    public boolean isSubEnd;
    public boolean haveSub;


    public SubResponse() {
    }

    public void setDaysRemaining(Long daysRemaining) {
        this.daysRemaining = daysRemaining;
    }

    public void setIsSubEnd(Boolean isSubEnd) {
        this.isSubEnd = isSubEnd;
    }

    public boolean getHaveSub(){ return this.haveSub;}
    public void setHaveSub(Boolean haveSub) {
        this.haveSub = haveSub;
    }


}
