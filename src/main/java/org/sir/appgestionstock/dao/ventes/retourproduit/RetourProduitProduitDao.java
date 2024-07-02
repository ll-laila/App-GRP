package org.sir.appgestionstock.dao.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface RetourProduitProduitDao extends JpaRepository<RetourProduitProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<RetourProduitProduit> findByProduitId(Long id);
int deleteByRetourProduitId(Long id);
List<RetourProduitProduit> findByRetourProduitId(Long id);
    @Query("SELECT MAX(item.id) FROM RetourProduitProduit item")
    Long findMaxId();
}