package org.sir.appgestionstock.ws.converter.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.PlanDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PlanConverter {

    public PlanDto toDto(Plan item) {
        if (item == null) return null;

        PlanDto dto = new PlanDto();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setPrice(item.getPrice());
        dto.setMaxEntreprises(item.getMaxEntreprises());
        dto.setDescription(item.getDescription());
        return dto;
    }

    public Plan toItem(PlanDto dto) {
        if (dto == null) return null;

        Plan item = new Plan();
        item.setId(dto.getId());
        item.setName(dto.getName());
        item.setPrice(dto.getPrice());
        item.setMaxEntreprises(dto.getMaxEntreprises());
        item.setDescription(dto.getDescription());
        return item;
    }

    public List<PlanDto> toDto(List<Plan> items) {
        if (items == null) return null;

        List<PlanDto> list = new ArrayList<>();
        for (Plan item : items) {
            list.add(toDto(item));
        }
        return list;
    }

    public List<Plan> toItem(List<PlanDto> dtos) {
        if (dtos == null) return null;

        List<Plan> list = new ArrayList<>();
        for (PlanDto dto : dtos) {
            list.add(toItem(dto));
        }
        return list;
    }
}
