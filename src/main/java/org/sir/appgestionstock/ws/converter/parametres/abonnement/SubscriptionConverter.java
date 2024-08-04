package org.sir.appgestionstock.ws.converter.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.SubscriptionDto;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SubscriptionConverter {

    @Autowired
    private PlanConverter planConverter;

    @Autowired
    private AppUserConverter appUserConverter;

    private boolean plan = true;
    private boolean user = true;


    public SubscriptionDto toDto(Subscription item) {
        if (item == null) return null;

        SubscriptionDto dto = new SubscriptionDto();
        dto.setId(item.getId());
        dto.setPlan(plan? planConverter.toDto(item.getPlan()): null);
        dto.setUser(user? appUserConverter.toDto(item.getUser()): null);
        dto.setSubscriptionDate(item.getSubscriptionDate());
        dto.setSubscriptionEndDate(item.getSubscriptionEndDate());
        return dto;
    }

    public Subscription toItem(SubscriptionDto dto) {
        if (dto == null) return null;

        Subscription item = new Subscription();
        item.setId(dto.getId());
        item.setPlan(planConverter.toItem(dto.getPlan()));
        item.setUser(appUserConverter.toItem(dto.getUser()));
        item.setSubscriptionDate(dto.getSubscriptionDate());
        item.setSubscriptionEndDate(dto.getSubscriptionEndDate());
        return item;
    }

    public List<SubscriptionDto> toDto(List<Subscription> items) {
        if (items == null) return null;

        List<SubscriptionDto> list = new ArrayList<>();
        for (Subscription item : items) {
            list.add(toDto(item));
        }
        return list;
    }

    public List<Subscription> toItem(List<SubscriptionDto> dtos) {
        if (dtos == null) return null;

        List<Subscription> list = new ArrayList<>();
        for (SubscriptionDto dto : dtos) {
            list.add(toItem(dto));
        }
        return list;
    }


    public void setPlan(boolean value) {
        this.plan = value;
    }

    public void setUser(boolean value) {
        this.user = value;
    }

    public PlanConverter getPlanConverter() {
        return planConverter;
    }

    public AppUserConverter getAppUserConverter() {
        return appUserConverter;
    }

}
