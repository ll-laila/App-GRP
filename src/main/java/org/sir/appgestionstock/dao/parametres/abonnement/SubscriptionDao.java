package org.sir.appgestionstock.dao.parametres.abonnement;

import org.sir.appgestionstock.bean.core.parametres.abonnement.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionDao extends JpaRepository<Subscription, Long> {
}
