package org.sir.appgestionstock.zsecurity.ws.converter;

import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.ws.dto.AppUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AppUserConverter {
    @Lazy
    private RoleConverter roleConverter;

    private boolean role = true;

    @Autowired
    public AppUserConverter(RoleConverter roleConverter) {
        this.roleConverter = roleConverter;
    }

    public AppUserConverter(RoleConverter roleConverter, boolean role) {
        this.roleConverter = roleConverter;
        this.role = role;
    }

    protected void configure(boolean value) {
        this.roleConverter.setUser(value);
    }

    public final AppUserDto toDto(AppUser item) {
        if (item == null) return null;
        this.configure(false);
        var dto = new AppUserDto();
        dto.setId(item.getId());
        dto.setCredentialsNonExpired(item.isCredentialsNonExpired());
        dto.setEnabled(item.isEnabled());
        dto.setEmail(item.getEmail());
        dto.setPhone(item.getPhone());
        dto.setAccountNonExpired(item.isAccountNonExpired());
        dto.setAccountNonLocked(item.isAccountNonLocked());
        dto.setUsername(item.getUsername());
        dto.setPasswordChanged(item.isPasswordChanged());
        dto.setRoles(role ? roleConverter.toDto(item.getRoles()) : null);
        this.configure(true);
        return dto;
    }

    public final AppUser toItem(AppUserDto dto) {
        if (dto == null) return null;
        AppUser item = new AppUser();
        item.setId(dto.getId());
        item.setCredentialsNonExpired(dto.isCredentialsNonExpired());
        item.setEnabled(dto.isEnabled());
        item.setEmail(dto.getEmail());
        item.setPhone(dto.getPhone());
        item.setAccountNonExpired(dto.isAccountNonExpired());
        item.setAccountNonLocked(dto.isAccountNonLocked());
        item.setUsername(dto.getUsername());
        item.setPassword(dto.getPassword());
        item.setPasswordChanged(dto.isPasswordChanged());
        item.setRoles(roleConverter.toItem(dto.getRoles()));
        return item;
    }

    // AppUserConverter.java
    public List<AppUser> toItem(List<AppUserDto> dtos) {
        List<AppUser> items = new ArrayList<>();
        if (dtos != null) {
            dtos.forEach(it -> items.add(toItem(it)));
        }
        return items;
    }

    public final List<AppUserDto> toDto(List<AppUser> items) {
        List<AppUserDto> list = new ArrayList<>();
        items.forEach(it -> list.add(toDto(it)));
        return list;
    }

    public <T extends AppUser, DTO extends AppUserDto> void convertToChildDto(T childItem, DTO dto) {
        var userDto = toDto(childItem);
        dto.setId(userDto.getId());
        dto.setCredentialsNonExpired(userDto.isCredentialsNonExpired());
        dto.setEnabled(userDto.isEnabled());
        dto.setEmail(userDto.getEmail());
        dto.setPhone(userDto.getPhone());
        dto.setAccountNonExpired(userDto.isAccountNonExpired());
        dto.setAccountNonLocked(userDto.isAccountNonLocked());
        dto.setUsername(userDto.getUsername());
        dto.setPasswordChanged(userDto.isPasswordChanged());
        dto.setRoles(userDto.getRoles());
    }

    public <T extends AppUser, DTO extends AppUserDto> void convertToChildItem(DTO childDto, T item) {
        AppUser user = toItem(childDto);
        item.setId(user.getId());
        item.setCredentialsNonExpired(user.isCredentialsNonExpired());
        item.setEnabled(user.isEnabled());
        item.setCreatedOn(user.getCreatedOn());
        item.setUpdatedOn(user.getUpdatedOn());
        item.setEmail(user.getEmail());
        item.setPhone(user.getPhone());
        item.setAccountNonExpired(user.isAccountNonExpired());
        item.setAccountNonLocked(user.isAccountNonLocked());
        item.setUsername(user.getUsername());
        item.setPassword(user.getPassword());
        item.setPasswordChanged(user.isPasswordChanged());
        item.setRoles(user.getRoles());
    }

    public RoleConverter getRoleConverter() {
        return this.roleConverter;
    }

    public boolean isRole() {
        return this.role;
    }

    public void setRoleConverter(RoleConverter roleConverter) {
        this.roleConverter = roleConverter;
    }

    public void setRole(boolean role) {
        this.role = role;
    }
}
