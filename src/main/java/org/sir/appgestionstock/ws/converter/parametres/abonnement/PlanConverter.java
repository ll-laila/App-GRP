package org.sir.appgestionstock.ws.converter.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.PlanDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlanConverter {

    public PlanDto toDto(Plan entity) {
        if (entity == null) {
            return null;
        }

        PlanDto dto = new PlanDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setMaxEntreprises(entity.getMaxEntreprises());

        return dto;
    }

    public List<PlanDto> toDto(List<Plan> entities) {
        if (entities == null) {
            return null;
        }

        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Plan toItem(PlanDto dto) {
        if (dto == null) {
            return null;
        }

        Plan entity = new Plan();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setPrice(dto.getPrice());
        entity.setMaxEntreprises(dto.getMaxEntreprises());

        return entity;
    }

    public List<Plan> toItem(List<PlanDto> dtos) {
        if (dtos == null) {
            return null;
        }

        return dtos.stream().map(this::toItem).collect(Collectors.toList());
    }
}

