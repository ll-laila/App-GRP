package org.sir.appgestionstock.zsecurity.ws.restapi;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.dao.contacts.user.EmployeDao;
import org.sir.appgestionstock.dao.parametres.EntrepriseDao;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.zsecurity.dao.AppUserDao;
import org.sir.appgestionstock.zsecurity.entity.Authority;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.jwt.JwtUtils;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.sir.appgestionstock.zsecurity.ws.dto.request.LoginRequest;
import org.sir.appgestionstock.zsecurity.ws.dto.response.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.stream.Collectors;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/login")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    private AppUserDao appUserDao;

    @Autowired
    private EntrepriseDao entrepriseDao;

    @Autowired
    private EmployeDao employeDao;

    @Autowired
    private EntrepriseService entrepriseService;


    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, AppUserService appUserService, AppUserConverter appUserConverter) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        AppUser userDetails = (AppUser) authentication.getPrincipal();
        List<String> authorities = userDetails
                .getAuthorities()
                .stream().map(Authority::getAuthority)
                .toList();

        JwtResponse response = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), authorities);
        return ResponseEntity.ok(response);
    }



   // @Scheduled(cron = "*/5 * * * * *")
    public void removeExpiredTrials() {
        Date now = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        cal.add(Calendar.DAY_OF_MONTH, -15);
        Date cutoffDate = cal.getTime();

        List<AppUser> expiredTrials = appUserDao.findByIsTrialTrueAndSubscriptionIsNullAndRegistrationDateBefore(cutoffDate);
        List<AppUser> expiredTrialsAdmin = expiredTrials.stream()
                .filter(user -> user.getRoles().stream()
                        .anyMatch(role -> "ADMIN".equals(role.getName())))
                .collect(Collectors.toList());


        for (AppUser user : expiredTrialsAdmin) {
            List<Entreprise> entreprises = entrepriseDao.findByIdAdmin(user.getId());
            for (Entreprise entreprise : entreprises) {
                List<Employe> employes = employeDao.findByEntreprise(entreprise);
                employeDao.deleteAll(employes);
                entrepriseDao.delete(entreprise);
            }
        }
        appUserDao.deleteAll(expiredTrialsAdmin);
    }

}
