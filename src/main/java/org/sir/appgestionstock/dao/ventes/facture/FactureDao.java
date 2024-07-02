package org.sir.appgestionstock.dao.ventes.facture;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface FactureDao extends JpaRepository<Facture, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByPaiementId(Long id);
Facture findByPaiementId(Long id);
int deleteByRetourProduitId(Long id);
Facture findByRetourProduitId(Long id);
int deleteByTaxeId(Long id);
List<Facture> findByTaxeId(Long id);
int deleteByTaxeExpeditionId(Long id);
List<Facture> findByTaxeExpeditionId(Long id);
int deleteByClientId(Long id);
List<Facture> findByClientId(Long id);
int deleteByDevisesId(Long id);
List<Facture> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Facture> findByNiveauPrixId(Long id);
int deleteByAddressFacturationId(Long id);
Facture findByAddressFacturationId(Long id);
int deleteByAddressExpeditionId(Long id);
Facture findByAddressExpeditionId(Long id);
int deleteByEntrepriseId(Long id);
List<Facture> findByEntrepriseId(Long id);
@Query("SELECT NEW Facture(item.id,item.code) FROM Facture item")
List<Facture> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Facture item")
    Long findMaxId();
}