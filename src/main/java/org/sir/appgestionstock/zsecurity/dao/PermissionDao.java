package org.sir.appgestionstock.zsecurity.dao;

import org.sir.appgestionstock.zsecurity.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PermissionDao extends JpaRepository<Permission, Long> {
    Permission findByName(String name);
}