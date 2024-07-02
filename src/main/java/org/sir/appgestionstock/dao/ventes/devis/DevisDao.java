package org.sir.appgestionstock.dao.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface DevisDao extends JpaRepository<Devis, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByPaiementId(Long id);
Devis findByPaiementId(Long id);
int deleteByRetourProduitId(Long id);
Devis findByRetourProduitId(Long id);
int deleteByTaxeId(Long id);
List<Devis> findByTaxeId(Long id);
int deleteByTaxeExpeditionId(Long id);
List<Devis> findByTaxeExpeditionId(Long id);
int deleteByClientId(Long id);
List<Devis> findByClientId(Long id);
int deleteByDevisesId(Long id);
List<Devis> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Devis> findByNiveauPrixId(Long id);
int deleteByEntrepriseId(Long id);
List<Devis> findByEntrepriseId(Long id);
@Query("SELECT NEW Devis(item.id,item.code) FROM Devis item")
List<Devis> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Devis item")
    Long findMaxId();
}