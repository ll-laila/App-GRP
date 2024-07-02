package org.sir.appgestionstock.service.facade.ventes.commande;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface CommandeProduitService {
CommandeProduit findById(Long id);
List<CommandeProduit> findAllOptimized();
List<CommandeProduit> findAll();
Pagination<CommandeProduit> findPaginated(int page, int size);
CommandeProduit create(CommandeProduit item);
List<CommandeProduit> create(List<CommandeProduit> item);
CommandeProduit update(CommandeProduit item);
List<CommandeProduit> update(List<CommandeProduit> item);
void deleteById(Long id);
void delete(CommandeProduit item);
void delete(List<CommandeProduit> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<CommandeProduit> findByProduitId(Long id);
int deleteByCommandeId(Long id);
List<CommandeProduit> findByCommandeId(Long id);
    Long findMaxId();
}