package org.sir.appgestionstock.service.facade.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface RetourProduitService {
RetourProduit findById(Long id);
List<RetourProduit> getRetourProduits(Long id);
List<RetourProduit> findAllOptimized();
List<RetourProduit> findAll();
Pagination<RetourProduit> findPaginated(int page, int size);
RetourProduit create(RetourProduit item);
List<RetourProduit> create(List<RetourProduit> item);
RetourProduit update(RetourProduit item);
List<RetourProduit> update(List<RetourProduit> item);
void deleteById(Long id);
void delete(RetourProduit item);
void delete(List<RetourProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByClientId(Long id);
List<RetourProduit> findByClientId(Long id);


int deleteByFactureId(Long id);
RetourProduit findByFactureId(Long id);

int deleteByEntrepriseId(Long id);
List<RetourProduit> findByEntrepriseId(Long id);
    Long findMaxId();
}