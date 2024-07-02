package org.sir.appgestionstock.service.impl;

import org.sir.appgestionstock.bean.core.ClientProduitNiveauPrix;
import org.sir.appgestionstock.dao.ClientProduitNiveauPrixDao;
import org.sir.appgestionstock.service.facade.ClientProduitNiveauPrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClientProduitNiveauPrixImpl implements ClientProduitNiveauPrixService {
    @Autowired
    private ClientProduitNiveauPrixDao dao;
    @Override
    public ClientProduitNiveauPrix create(ClientProduitNiveauPrix item) {
        return dao.save(item);
    }

    @Override
    public List<ClientProduitNiveauPrix> create(List<ClientProduitNiveauPrix> item) {
        return null;
    }

    @Override
    public ClientProduitNiveauPrix update(ClientProduitNiveauPrix item) {
        return null;
    }

    @Override
    public List<ClientProduitNiveauPrix> update(List<ClientProduitNiveauPrix> item) {
        return null;
    }
}
