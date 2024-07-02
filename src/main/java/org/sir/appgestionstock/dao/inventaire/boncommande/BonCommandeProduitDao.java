package org.sir.appgestionstock.dao.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface BonCommandeProduitDao extends JpaRepository<BonCommandeProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<BonCommandeProduit> findByProduitId(Long id);
int deleteByBonCommandeId(Long id);
List<BonCommandeProduit> findByBonCommandeId(Long id);
    @Query("SELECT MAX(item.id) FROM BonCommandeProduit item")
    Long findMaxId();
}