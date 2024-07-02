package org.sir.appgestionstock.service.facade.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface LivraisonProduitService {
LivraisonProduit findById(Long id);
List<LivraisonProduit> findAllOptimized();
List<LivraisonProduit> findAll();
Pagination<LivraisonProduit> findPaginated(int page, int size);
LivraisonProduit create(LivraisonProduit item);
List<LivraisonProduit> create(List<LivraisonProduit> item);
LivraisonProduit update(LivraisonProduit item);
List<LivraisonProduit> update(List<LivraisonProduit> item);
void deleteById(Long id);
void delete(LivraisonProduit item);
void delete(List<LivraisonProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<LivraisonProduit> findByProduitId(Long id);
int deleteByLivraisonId(Long id);
List<LivraisonProduit> findByLivraisonId(Long id);
    Long findMaxId();
}