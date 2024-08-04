package org.sir.appgestionstock.service.facade.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;

import java.util.List;

public interface PlanService {

    Plan getPlanByName(String name);
    List<Plan> planList();
    Plan findById(Long id);
    boolean existSId(Long id);
}
