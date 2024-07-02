package org.sir.appgestionstock.service.facade;

import org.sir.appgestionstock.bean.core.ClientProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientProduitNiveauPrixService {
    ClientProduitNiveauPrix create(ClientProduitNiveauPrix item);
    List<ClientProduitNiveauPrix> create(List<ClientProduitNiveauPrix> item);
    ClientProduitNiveauPrix update(ClientProduitNiveauPrix item);
    List<ClientProduitNiveauPrix> update(List<ClientProduitNiveauPrix> item);
}
