package org.sir.appgestionstock.service.facade.parametres;

import org.sir.appgestionstock.bean.core.parametres.Notification;

import java.util.List;

public interface NotificationService {
    Notification createNotification(Notification notification);
    List<Notification> findAllByIdErp(Long id);
    void delete(Notification notification);
}
