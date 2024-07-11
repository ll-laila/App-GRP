package org.sir.appgestionstock.ws.converter.contacts.user;

import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.ws.dto.contacts.user.PermissionsAccesDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PermissionsAccesConverter {

    public final PermissionsAccesDto toDto(PermissionsAcces item) {
        return item != null ? convertToDto(item) : null;
    }

    public final PermissionsAcces toItem(PermissionsAccesDto dto) {
        return dto != null ? convertToItem(dto) : null;
    }

    public final List<PermissionsAcces> toItem(List<PermissionsAccesDto> dtos) {
        if (dtos == null) return null;
        List<PermissionsAcces> list = new ArrayList<>();
        dtos.forEach(it -> list.add(toItem(it)));
        return list;
    }

    public final List<PermissionsAccesDto> toDto(List<PermissionsAcces> items) {
        if (items == null) return null;
        List<PermissionsAccesDto> list = new ArrayList<>();
        items.forEach(it -> list.add(toDto(it)));
        return list;
    }

    protected PermissionsAcces convertToItem(PermissionsAccesDto dto) {
        PermissionsAcces item = new PermissionsAcces();
        item.setNom(dto.getNom());
        item.setEtat(dto.getEtat());
        item.setEntrepriseId(dto.getEntrepriseId());
        return item;
    }

    protected PermissionsAccesDto convertToDto(PermissionsAcces item) {
        PermissionsAccesDto dto = new PermissionsAccesDto();
        dto.setNom(item.getNom());
        dto.setEtat(item.getEtat());
        dto.setEntrepriseId(item.getEntrepriseId());
        return dto;
    }
}
