package org.sir.appgestionstock.service.facade.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface BonCommandeProduitService {
BonCommandeProduit findById(Long id);
List<BonCommandeProduit> findAllOptimized();
List<BonCommandeProduit> findAll();
Pagination<BonCommandeProduit> findPaginated(int page, int size);
BonCommandeProduit create(BonCommandeProduit item);
List<BonCommandeProduit> create(List<BonCommandeProduit> item);
BonCommandeProduit update(BonCommandeProduit item);
List<BonCommandeProduit> update(List<BonCommandeProduit> item);
void deleteById(Long id);
void delete(BonCommandeProduit item);
void delete(List<BonCommandeProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<BonCommandeProduit> findByProduitId(Long id);
int deleteByBonCommandeId(Long id);
List<BonCommandeProduit> findByBonCommandeId(Long id);
    Long findMaxId();
}