package org.sir.appgestionstock.service.facade.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface RetourProduitProduitService {
RetourProduitProduit findById(Long id);
List<RetourProduitProduit> findAllOptimized();
List<RetourProduitProduit> findAll();
Pagination<RetourProduitProduit> findPaginated(int page, int size);
RetourProduitProduit create(RetourProduitProduit item);
List<RetourProduitProduit> create(List<RetourProduitProduit> item);
RetourProduitProduit update(RetourProduitProduit item);
List<RetourProduitProduit> update(List<RetourProduitProduit> item);
void deleteById(Long id);
void delete(RetourProduitProduit item);
void delete(List<RetourProduitProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<RetourProduitProduit> findByProduitId(Long id);
int deleteByRetourProduitId(Long id);
List<RetourProduitProduit> findByRetourProduitId(Long id);
    Long findMaxId();
}