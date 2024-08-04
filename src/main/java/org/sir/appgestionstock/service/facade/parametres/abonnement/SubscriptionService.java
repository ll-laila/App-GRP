package org.sir.appgestionstock.service.facade.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.sir.appgestionstock.zsecurity.entity.AppUser;

public interface SubscriptionService {
    Subscription create(Subscription item);
}
