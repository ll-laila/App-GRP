package org.sir.appgestionstock.dao.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface RetourProduitDao extends JpaRepository<RetourProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByClientId(Long id);
List<RetourProduit> findByClientId(Long id);

int deleteByFactureId(Long id);
RetourProduit findByFactureId(Long id);
int deleteByEntrepriseId(Long id);
List<RetourProduit> findByEntrepriseId(Long id);
@Query("SELECT NEW RetourProduit(item.id,item.code) FROM RetourProduit item")
List<RetourProduit> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM RetourProduit item")
    Long findMaxId();
}