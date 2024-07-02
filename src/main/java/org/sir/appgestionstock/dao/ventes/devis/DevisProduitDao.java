package org.sir.appgestionstock.dao.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface DevisProduitDao extends JpaRepository<DevisProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<DevisProduit> findByProduitId(Long id);
int deleteByDevisId(Long id);
List<DevisProduit> findByDevisId(Long id);
    @Query("SELECT MAX(item.id) FROM DevisProduit item")
    Long findMaxId();
}