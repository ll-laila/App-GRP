package org.sir.appgestionstock.dao.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanDao extends JpaRepository<Plan, Long> {

    Plan findPlanByName(String name);
}
