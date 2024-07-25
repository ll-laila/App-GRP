package org.sir.appgestionstock.zsecurity.ws.restapi;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.dao.contacts.user.EmployeDao;
import org.sir.appgestionstock.dao.parametres.EntrepriseDao;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.zsecurity.dao.AppUserDao;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.permissions.RoleEnum;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.sir.appgestionstock.zsecurity.ws.dto.AppUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RequestMapping("/api/app-user")
@RestController
public class AppUserRest {
    private final AppUserService appUserService;
    private final AppUserConverter appUserConverter;


    public AppUserRest(AppUserService appUserService, AppUserConverter appUserConverter) {
        this.appUserService = appUserService;
        this.appUserConverter = appUserConverter;
    }

    @GetMapping()
    public List<AppUserDto> findAll() {
        List<AppUser> all = this.appUserService.findAll();
        return appUserConverter.toDto(all);
    }
    @GetMapping("/findByUser/{username}")
    public AppUser findByUsername(String username) {
        return appUserService.findByUsername(username);
    }

    @GetMapping("/id/{id}")
    public AppUserDto findById(@PathVariable Long id) {
        AppUser byId = appUserService.findById(id);
        return appUserConverter.toDto(byId);
    }

    @DeleteMapping("/id/{id}")
    public void deleteById(@PathVariable Long id) {
        appUserService.deleteById(id);
    }

    @PostMapping
    public AppUserDto save(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        user.setRoles(List.of(RoleEnum.ADMIN.getRole()));
        AppUser saved = appUserService.save(user);
        return appUserConverter.toDto(saved);
    }


    @GetMapping("/essai/{username}")
    public long getDaysRemaining(@PathVariable String username) {
        AppUser user = appUserService.findByUsername(username);

        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé : " + username);
        }

        // Assurer que l'utilisateur est en période d'essai
        if (user.getIsTrial() == null || !user.getIsTrial()) {
            throw new IllegalArgumentException("L'utilisateur avec ID " + username + " n'est pas en période d'essai.");
        }

        Date registrationDate = user.getRegistrationDate();
        if (registrationDate == null) {
            throw new IllegalStateException("La date d'inscription de l'utilisateur avec ID " + username + " est nulle.");
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(registrationDate);
        cal.add(Calendar.DAY_OF_MONTH, 15);
        Date trialEndDate = cal.getTime();

        // Calculer la différence en jours entre la date actuelle et la date de fin de période d'essai
        long diffInMillis = trialEndDate.getTime() - new Date().getTime();
        long daysRemaining = diffInMillis / (1000 * 60 * 60 * 24);

        return daysRemaining;
    }



    @PutMapping()
    public AppUserDto update(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        AppUser saved = appUserService.update(user);
        return appUserConverter.toDto(saved);
    }

    @DeleteMapping()
    public int delete(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        return appUserService.delete(user);
    }

    @GetMapping("/username/{username}")
    public AppUserDto findByUsernameWithRoles(@PathVariable String username) {
        return appUserConverter.toDto(appUserService.findByUsernameWithRoles(username));
    }


    @DeleteMapping("/username/{username}")
    public int deleteByUsername(@PathVariable String username) {
        return appUserService.deleteByUsername(username);
    }
}

