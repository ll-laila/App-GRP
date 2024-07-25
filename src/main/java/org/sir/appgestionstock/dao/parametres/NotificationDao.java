package org.sir.appgestionstock.dao.parametres;

import org.sir.appgestionstock.bean.core.parametres.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationDao extends JpaRepository<Notification, Long> {
        List<Notification> findByEmployeeUsername(String username);

        List<Notification> findByEntrepriseId(Long id);
}
