package org.sir.appgestionstock.zsecurity.ws.dto;

import org.sir.appgestionstock.zutils.webservice.dto.AuditBaseDto;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class AppUserDto extends AuditBaseDto {
    protected Long id;
    protected boolean credentialsNonExpired = true;
    protected boolean enabled = true;
    protected String email;
    protected String phone;
    protected boolean accountNonExpired = true;
    protected boolean accountNonLocked = true;
    protected String username;
    protected String password;
    protected boolean passwordChanged = false;
    protected String confirmPassword;



     protected List<RoleDto> roles = new ArrayList<>();

    public AppUserDto() {
    }

    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public String getEmail() {
        return this.email;
    }

    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    public String getUsername() {
        return this.username;
    }

    public boolean isPasswordChanged() {
        return this.passwordChanged;
    }

    public List<RoleDto> getRoles() {
        return this.roles;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordChanged(boolean passwordChanged) {
        this.passwordChanged = passwordChanged;
    }

    public void setRoles(List<RoleDto> roles) {
        this.roles = roles;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getConfirmPassword() {
        return this.confirmPassword;
    }

    public String setConfirmPassword() {
        return this.confirmPassword;
    }
}
