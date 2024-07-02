package org.sir.appgestionstock.zsecurity.utils;

import org.sir.appgestionstock.Application;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;


@Service
public class SecurityUtil {

    private SecurityUtil() {
    }

    public static AppUser getCurrentUser() {
        AppUserService appUserService = Application.getCtx().getBean(AppUserService.class);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Object user = securityContext.getAuthentication().getPrincipal();
        System.out.println(user);
        if (user instanceof String s) {
            return appUserService.findByUsername((String) user);
        } else if (user instanceof AppUser) {
            return (AppUser) user;
        } else {
            return null;
        }
    }

    public static boolean isCurrentUserInRole(String authority) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null &&
                getAuthorities(authentication).anyMatch(authority::equals);
    }

    private static Stream<String> getAuthorities(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority);
    }

}
