package org.sir.appgestionstock.ws.providers.parametres.abonnement;

import org.sir.appgestionstock.service.facade.parametres.abonnement.PlanService;
import org.sir.appgestionstock.service.facade.parametres.abonnement.SubscriptionService;
import org.sir.appgestionstock.ws.converter.parametres.abonnement.PlanConverter;
import org.sir.appgestionstock.ws.converter.parametres.abonnement.SubscriptionConverter;
import org.sir.appgestionstock.ws.dto.parametres.DevisesDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.PlanDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/subscription")
public class SubscriptionProvider {

    @Autowired
    private PlanService planService;
    @Autowired
    private PlanConverter planConverter;

    @Autowired
    private SubscriptionService subscriptionService;
    @Autowired
    private SubscriptionConverter subscriptionConverter;


    @GetMapping("/plan/{name}")
    public ResponseEntity<PlanDto> findByName(@PathVariable String name) {
        var result = planService.getPlanByName(name);
        var resultDto = planConverter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }


}
