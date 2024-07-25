package org.sir.appgestionstock.service.impl.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Plan;
import org.sir.appgestionstock.dao.parametres.abonnement.PlanDao;
import org.sir.appgestionstock.service.facade.parametres.abonnement.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanDao dao;

    @Override
    public Plan getPlanByName(String name){
        return dao.findPlanByName(name);
    }


}
