package org.sir.appgestionstock.service.impl.parametres;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.parametres.Notification;
import org.sir.appgestionstock.dao.contacts.user.EmployeDao;
import org.sir.appgestionstock.dao.parametres.NotificationDao;
import org.sir.appgestionstock.service.facade.parametres.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationDao notificationDao;

    @Autowired
    public NotificationServiceImpl(NotificationDao notificationDao) {
        this.notificationDao = notificationDao;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Notification createNotification(Notification notification) {
        if (notification == null) return null;
        return notificationDao.save(notification);
    }
    @Transactional(rollbackFor = Exception.class)
    public void delete(Notification notification) {
        notificationDao.delete(notification);
    }
    @Override
    public List<Notification> findAllByIdErp(Long id) {
        return notificationDao.findByEntrepriseId(id);
    }
}
