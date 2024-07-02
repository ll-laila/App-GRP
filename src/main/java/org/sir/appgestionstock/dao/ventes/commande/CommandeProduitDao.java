package org.sir.appgestionstock.dao.ventes.commande;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface CommandeProduitDao extends JpaRepository<CommandeProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<CommandeProduit> findByProduitId(Long id);
int deleteByCommandeId(Long id);
List<CommandeProduit> findByCommandeId(Long id);
    @Query("SELECT MAX(item.id) FROM CommandeProduit item")
    Long findMaxId();
}