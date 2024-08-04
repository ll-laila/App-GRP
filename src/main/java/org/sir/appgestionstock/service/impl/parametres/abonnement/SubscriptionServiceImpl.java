package org.sir.appgestionstock.service.impl.parametres.abonnement;


import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.sir.appgestionstock.dao.parametres.abonnement.SubscriptionDao;
import org.sir.appgestionstock.exception.NotFoundException;
import org.sir.appgestionstock.service.facade.parametres.abonnement.PlanService;
import org.sir.appgestionstock.service.facade.parametres.abonnement.SubscriptionService;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;


@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private SubscriptionDao dao;

    @Autowired
    private PlanService planService;

    @Autowired
    private AppUserService appUserService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Subscription create(Subscription item){
        if (item == null) return null;

        var plan = item.getPlan();
        if (plan != null) {
            if (plan.getId() == null) item.setPlan(null);
            else {
                var found = planService.findById(plan.getId());
                if (found == null) throw new NotFoundException("Unknown Given plan");
                item.setPlan(found);
            }
        }

        var user = item.getUser();
        if (user != null) {
            if (user.getId() == null) item.setUser(null);
            else {
                var found = appUserService.findById(user.getId());
                if (found == null) throw new NotFoundException("Unknown Given user");
                item.setUser(found);
            }
        }

        Date subscriptionDate = new Date();
        item.setSubscriptionDate(subscriptionDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(subscriptionDate);
        calendar.add(Calendar.DAY_OF_MONTH, 30);
        Date subscriptionEndDate = calendar.getTime();
        item.setSubscriptionEndDate(subscriptionEndDate);

        if (item.getUser() != null) {
            dao.deleteByUserId(item.getUser().getId());
        }

        return dao.save(item);
    }



}
