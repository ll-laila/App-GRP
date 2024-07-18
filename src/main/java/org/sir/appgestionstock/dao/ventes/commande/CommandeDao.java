package org.sir.appgestionstock.dao.ventes.commande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface CommandeDao extends JpaRepository<Commande, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByFactureId(Long id);
Commande findByFactureId(Long id);
int deleteByTaxeId(Long id);
List<Commande> findByTaxeId(Long id);
int deleteByTaxeExpeditionId(Long id);
List<Commande> findByTaxeExpeditionId(Long id);
int deleteByClientId(Long id);
List<Commande> findByClientId(Long id);
int deleteByDevisesId(Long id);
List<Commande> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Commande> findByNiveauPrixId(Long id);
int deleteByAddressFacturationId(Long id);
Commande findByAddressFacturationId(Long id);
int deleteByAddressExpeditionId(Long id);
Commande findByAddressExpeditionId(Long id);
int deleteByEntrepriseId(Long id);
List<Commande> findByEntrepriseId(Long id);
@Query("SELECT NEW Commande(item.id,item.code) FROM Commande item")
List<Commande> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Commande item")
    Long findMaxId();



}