package org.sir.appgestionstock.zsecurity.dao;

import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AppUserDao  extends JpaRepository<AppUser, Long>{
    AppUser findByUsername(String username);
    int deleteByUsername(String username);
    AppUser findByEmail(String email);

    List<AppUser> findByIsTrialTrueAndSubscriptionIsNullAndRegistrationDateBefore(Date date);

}
