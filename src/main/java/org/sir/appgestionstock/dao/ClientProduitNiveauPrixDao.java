package org.sir.appgestionstock.dao;

import org.sir.appgestionstock.bean.core.ClientProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientProduitNiveauPrixDao extends JpaRepository<ClientProduitNiveauPrix,Long> {

    int deleteByIdIn(List<Long> ids);

}
