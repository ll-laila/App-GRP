package org.sir.appgestionstock.ws.providers.parametres.abonnement;

import org.sir.appgestionstock.service.facade.parametres.abonnement.PlanService;
import org.sir.appgestionstock.ws.converter.parametres.abonnement.PlanConverter;
import org.sir.appgestionstock.ws.dto.parametres.abonnement.PlanDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/plan")
public class PlanProvider {

    @Autowired
    private PlanConverter planConverter;

    @Autowired
    private PlanService planService;


    @GetMapping("/planList")
    public ResponseEntity<List<PlanDto>> planList() {
        var result = planService.planList();
        var resultDto = planConverter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/plan/{id}")
    public ResponseEntity<PlanDto> findByName(@PathVariable Long id) {
        var result = planService.findById(id);
        var resultDto = planConverter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }



}
