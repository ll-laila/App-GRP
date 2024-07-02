package org.sir.appgestionstock.service.facade.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface DevisProduitService {
DevisProduit findById(Long id);
List<DevisProduit> findAllOptimized();
List<DevisProduit> findAll();
Pagination<DevisProduit> findPaginated(int page, int size);
DevisProduit create(DevisProduit item);
List<DevisProduit> create(List<DevisProduit> item);
DevisProduit update(DevisProduit item);
List<DevisProduit> update(List<DevisProduit> item);
void deleteById(Long id);
void delete(DevisProduit item);
void delete(List<DevisProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<DevisProduit> findByProduitId(Long id);
int deleteByDevisId(Long id);
List<DevisProduit> findByDevisId(Long id);
    Long findMaxId();
}