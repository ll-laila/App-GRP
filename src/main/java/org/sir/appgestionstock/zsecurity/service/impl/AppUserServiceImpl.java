package org.sir.appgestionstock.zsecurity.service.impl;

import org.sir.appgestionstock.zsecurity.entity.Role;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.dao.AppUserDao;
import org.sir.appgestionstock.zsecurity.service.facade.RoleService;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService {
    private final AppUserDao appUserDao;
    private final RoleService roleService;
    @Lazy
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    public AppUserServiceImpl(AppUserDao appUserDao, RoleService roleService) {
        this.appUserDao = appUserDao;
        this.roleService = roleService;
    }

    @Override
    public String cryptPassword(String value) {
        return value == null ? null : bCryptPasswordEncoder.encode(value);
    }

    @Override
    public boolean changePassword(String username, String newPassword) {
        AppUser user = appUserDao.findByUsername(username);
        if (user != null) {
            user.setPassword(cryptPassword(newPassword));
            user.setPasswordChanged(true);
            appUserDao.save(user);
            return true;
        }
        return false;
    }


    @Override
    public List<AppUser> findAll() {
        return appUserDao.findAll();
    }

    @Override
    public AppUser findByUsername(String username) {
        if (username == null)
            return null;
        return appUserDao.findByUsername(username);
    }

    @Override
    public AppUser findByUsernameWithRoles(String username) {
        if (username == null)
            return null;
        return appUserDao.findByUsername(username);
    }



    @Override
    @Transactional
    public int deleteByUsername(String username) {
        return appUserDao.deleteByUsername(username);
    }

    @Override
    public AppUser findById(Long id) {
        return appUserDao.findById(id).orElse(null);
    }

    @Transactional
    public void deleteById(Long id) {
        appUserDao.deleteById(id);
    }

    @Override
    public AppUser save(AppUser user) {
       // user.setRoles(List.of(RoleEnum.ADMIN.getRole()));
        AppUser foundedUserByUsername = findByUsername(user.getUsername());
        AppUser foundedUserByEmail = appUserDao.findByEmail(user.getEmail());
        if (foundedUserByUsername != null || foundedUserByEmail != null) return null;
        else {
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword(bCryptPasswordEncoder.encode(user.getUsername()));
            } else {
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
            user.setAccountNonExpired(true);
            user.setAccountNonLocked(true);
            user.setCredentialsNonExpired(true);
            user.setEnabled(true);
            user.setPasswordChanged(false);
            user.setCreatedOn(LocalDateTime.now());

            if (user.getRoles() != null) {
                List<Role> roles = new ArrayList<>();
                for (Role role : user.getRoles()) {
                    roles.add(roleService.save(role));
                }
                user.setRoles(roles);
            }

            user.setRegistrationDate(new Date());
            user.setIsTrial(true);

            return appUserDao.save(user);
        }
    }


    @Override
    public AppUser update(AppUser user) {
        AppUser foundedUser = findById(user.getId());
        if (foundedUser == null) return null;
        else {
            foundedUser.setEmail(user.getEmail());
            foundedUser.setUsername(user.getUsername());
            foundedUser.setEnabled(user.isEnabled());
            foundedUser.setCredentialsNonExpired(user.isCredentialsNonExpired());
            foundedUser.setAccountNonLocked(user.isAccountNonLocked());
            foundedUser.setAccountNonExpired(user.isAccountNonExpired());
            foundedUser.setAuthorities(new ArrayList<>());
            List<Role> roles = new ArrayList<>();
            for (Role role : user.getRoles()) {
                roles.add(roleService.save(role));
            }
            foundedUser.setRoles(roles);
            return appUserDao.save(foundedUser);
        }
    }

    @Override
    @Transactional
    public int delete(AppUser user) {
        if (user == null || user.getId() == null) return 0;
        AppUser foundedUser = findById(user.getId());
        if (foundedUser == null) return -1;
        appUserDao.delete(foundedUser);
        return 1;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsernameWithRoles(username);
    }


}
