package org.sir.appgestionstock.dao.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface LivraisonProduitDao extends JpaRepository<LivraisonProduit, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<LivraisonProduit> findByProduitId(Long id);
int deleteByLivraisonId(Long id);
List<LivraisonProduit> findByLivraisonId(Long id);
    @Query("SELECT MAX(item.id) FROM LivraisonProduit item")
    Long findMaxId();
}