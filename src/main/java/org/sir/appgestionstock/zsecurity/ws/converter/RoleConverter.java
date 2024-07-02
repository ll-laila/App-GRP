package org.sir.appgestionstock.zsecurity.ws.converter;

import org.sir.appgestionstock.zsecurity.entity.Role;
import org.sir.appgestionstock.zsecurity.ws.dto.RoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoleConverter {
    @Autowired @Lazy private AppUserConverter appUserConverter;
    @Autowired @Lazy private PermissionConverter permissionConverter;
    private boolean user = true;
    private boolean permission = true;

    protected void configure(boolean value) {
        this.appUserConverter.setRole(value);
        this.permissionConverter.setRole(value);
    }

    public final RoleDto toDto(Role item) {
        this.configure(false);
        if(item == null) return null;
        var dto = new RoleDto();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setUsers(user ? appUserConverter.toDto(item.getUsers()) : null);
        dto.setPermissions(permission ? permissionConverter.toDto(item.getPermissions()) : null);
        this.configure(true);
        return dto;
    }

    public final Role toItem(RoleDto dto) {
        if(dto == null) return null;
        var item = new Role();
        item.setId(dto.getId());
        item.setName(dto.getName());
        item.setUsers(appUserConverter.toItem(dto.getUsers()));
        item.setPermissions(permissionConverter.toItem(dto.getPermissions()));
        return item;
    }

    public final List<Role> toItem(List<RoleDto> dtos) {
        List<Role> list = new ArrayList<>();
        dtos.forEach(it -> list.add(toItem(it)));
        return list;
    }

    public final List<RoleDto> toDto(List<Role> items) {
        List<RoleDto> list = new ArrayList<>();
        items.forEach(it -> list.add(toDto(it)));
        return list;
    }

    public AppUserConverter getUserConverter() {
        return appUserConverter;
    }

    public void setUserConverter(AppUserConverter appUserConverter) {
        this.appUserConverter = appUserConverter;
    }

    public boolean isUser() {
        return user;
    }

    public void setUser(boolean user) {
        this.user = user;
    }

    public PermissionConverter getPermissionConverter() {
        return permissionConverter;
    }

    public void setPermissionConverter(PermissionConverter permissionConverter) {
        this.permissionConverter = permissionConverter;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(boolean permission) {
        this.permission = permission;
    }
}
