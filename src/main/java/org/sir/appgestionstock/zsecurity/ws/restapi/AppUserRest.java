package org.sir.appgestionstock.zsecurity.ws.restapi;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.sir.appgestionstock.dao.parametres.abonnement.SubscriptionDao;
import org.sir.appgestionstock.service.facade.contacts.user.EmployeService;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.permissions.RoleEnum;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.sir.appgestionstock.zsecurity.ws.dto.AppUserDto;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.SubResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RequestMapping("/api/app-user")
@RestController
public class AppUserRest {
    private final AppUserService appUserService;
    private final AppUserConverter appUserConverter;

    private final SubscriptionDao subscriptiondao;

    private final EmployeService employeService;

    public AppUserRest(AppUserService appUserService, AppUserConverter appUserConverter, SubscriptionDao subscriptiondao, EmployeService employeService) {
        this.appUserService = appUserService;
        this.appUserConverter = appUserConverter;
        this.subscriptiondao = subscriptiondao;
        this.employeService = employeService;
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
    public SubResponse getDaysRemaining(@PathVariable String username) {
        SubResponse response = new SubResponse();
        AppUser user = new AppUser();
        Employe employe = employeService.findByUsername(username);

        if(employe != null){
             user = appUserService.findByUsername(employe.getAdmin());
        }else{
            user = appUserService.findByUsername(username);
        }

        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé : " + username);
        }

        if (user.getIsTrial() == null || !user.getIsTrial()) {
            throw new IllegalArgumentException("L'utilisateur avec ID " + username + " n'est pas en période d'essai.");
        }

        //daysRemaining
        Date registrationDate = user.getRegistrationDate();
        if (registrationDate == null) {
            throw new IllegalStateException("La date d'inscription de l'utilisateur avec ID " + username + " est nulle.");
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(registrationDate);
        cal.add(Calendar.DAY_OF_MONTH, 15);
        Date trialEndDate = cal.getTime();
        long diffInMillis = trialEndDate.getTime() - new Date().getTime();
        long daysRemaining = diffInMillis / (1000 * 60 * 60 * 24);

        // Check subscription end
        Subscription subscription = subscriptiondao.findByUserId(user.getId());
        boolean isSubEnd = false;
        boolean haveSub = false;

        if (subscription != null) {
            Date subscriptionEndDate = subscription.getSubscriptionEndDate();
            if (subscriptionEndDate != null && new Date().after(subscriptionEndDate)) {
                isSubEnd = true;
            }
            haveSub = true;
        }

        response.setDaysRemaining(daysRemaining);
        response.setIsSubEnd(isSubEnd);
        response.setHaveSub(haveSub);
        return response;
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

