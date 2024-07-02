package org.sir.appgestionstock.dao.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface LivraisonDao extends JpaRepository<Livraison, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByTaxeExpeditionId(Long id);
List<Livraison> findByTaxeExpeditionId(Long id);
int deleteByFournisseurId(Long id);
List<Livraison> findByFournisseurId(Long id);
int deleteByEntrepriseId(Long id);
List<Livraison> findByEntrepriseId(Long id);
@Query("SELECT NEW Livraison(item.id,item.code) FROM Livraison item")
List<Livraison> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Livraison item")
    Long findMaxId();
}