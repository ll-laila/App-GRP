package org.sir.appgestionstock.service.facade.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;

public interface PlanService {

    Plan getPlanByName(String name);
}
