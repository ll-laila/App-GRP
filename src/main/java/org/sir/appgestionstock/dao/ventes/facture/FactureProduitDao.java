package org.sir.appgestionstock.dao.ventes.facture;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface FactureProduitDao extends JpaRepository<FactureProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<FactureProduit> findByProduitId(Long id);
int deleteByFactureId(Long id);
List<FactureProduit> findByFactureId(Long id);
    @Query("SELECT MAX(item.id) FROM FactureProduit item")
    Long findMaxId();
}