package org.sir.appgestionstock.service.facade.ventes.facture;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface FactureProduitService {
FactureProduit findById(Long id);
List<FactureProduit> findAllOptimized();
List<FactureProduit> findAll();
Pagination<FactureProduit> findPaginated(int page, int size);
FactureProduit create(FactureProduit item);
List<FactureProduit> create(List<FactureProduit> item);
FactureProduit update(FactureProduit item);
List<FactureProduit> update(List<FactureProduit> item);
void deleteById(Long id);
void delete(FactureProduit item);
public FactureProduit calculerTotal(FactureProduit item) ;
void delete(List<FactureProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<FactureProduit> findByProduitId(Long id);
int deleteByFactureId(Long id);
List<FactureProduit> findByFactureId(Long id);
    Long findMaxId();
}