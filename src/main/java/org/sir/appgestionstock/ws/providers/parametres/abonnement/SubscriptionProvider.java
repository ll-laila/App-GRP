package org.sir.appgestionstock.ws.providers.parametres.abonnement;

import org.sir.appgestionstock.dao.parametres.abonnement.SubscriptionDao;
import org.sir.appgestionstock.service.facade.parametres.abonnement.PlanService;
import org.sir.appgestionstock.service.facade.parametres.abonnement.SubscriptionService;
import org.sir.appgestionstock.ws.converter.parametres.abonnement.PlanConverter;
import org.sir.appgestionstock.ws.converter.parametres.abonnement.SubscriptionConverter;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.SubscriptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/subscription")
public class SubscriptionProvider {

    @Autowired
    private SubscriptionService service;
    @Autowired
    private SubscriptionConverter converter;
    @Autowired
    private SubscriptionDao subscriptionDao;

    @PostMapping
    public ResponseEntity<SubscriptionDto> save(@RequestBody SubscriptionDto dto) {
        if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = converter.toItem(dto);
        var result = service.create(item);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDto> find(@PathVariable Long id) {
        var result = subscriptionDao.findByUserId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }



}
