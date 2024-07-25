package org.sir.appgestionstock.ws.converter.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.SubscriptionDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SubscriptionConverter {

    public SubscriptionDto toDto(Subscription entity) {
        if (entity == null) {
            return null;
        }

        SubscriptionDto dto = new SubscriptionDto();
        dto.setId(entity.getId());
        dto.setPlan(entity.getPlan());
        dto.setUser(entity.getUser());
        dto.setSubscriptionDate(entity.getSubscriptionDate());
        dto.setSubscriptionEndDate(entity.getSubscriptionEndDate());

        return dto;
    }

    public List<SubscriptionDto> toDto(List<Subscription> entities) {
        if (entities == null) {
            return null;
        }

        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Subscription toItem(SubscriptionDto dto) {
        if (dto == null) {
            return null;
        }

        Subscription entity = new Subscription();
        entity.setId(dto.getId());
        entity.setPlan(dto.getPlan());
        entity.setUser(dto.getUser());
        entity.setSubscriptionDate(dto.getSubscriptionDate());
        entity.setSubscriptionEndDate(dto.getSubscriptionEndDate());

        return entity;
    }

    public List<Subscription> toItem(List<SubscriptionDto> dtos) {
        if (dtos == null) {
            return null;
        }

        return dtos.stream().map(this::toItem).collect(Collectors.toList());
    }
}
