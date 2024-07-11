package org.sir.appgestionstock.service.impl.contacts.user;

import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.dao.contacts.user.PermissionsAccesDao;
import org.sir.appgestionstock.service.facade.contacts.user.PermissionsAccesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class PermissionsAccesServiceImpl implements PermissionsAccesService{

    @Lazy
    @Autowired
    private PermissionsAccesDao permissionsAccesDao;

    @Override
    public void create(PermissionsAcces item) {
        permissionsAccesDao.save(item);
    }
}
