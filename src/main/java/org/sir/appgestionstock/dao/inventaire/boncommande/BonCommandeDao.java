package org.sir.appgestionstock.dao.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface BonCommandeDao extends JpaRepository<BonCommande, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByLivraisonId(Long id);
BonCommande findByLivraisonId(Long id);
int deleteByTaxeId(Long id);
List<BonCommande> findByTaxeId(Long id);
int deleteByTaxeExpeditionId(Long id);
List<BonCommande> findByTaxeExpeditionId(Long id);
int deleteByFournisseurId(Long id);
List<BonCommande> findByFournisseurId(Long id);
int deleteByDevisesId(Long id);
List<BonCommande> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<BonCommande> findByNiveauPrixId(Long id);
int deleteByEntrepriseId(Long id);
List<BonCommande> findByEntrepriseId(Long id);
@Query("SELECT NEW BonCommande(item.id,item.code) FROM BonCommande item")
List<BonCommande> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM BonCommande item")
    Long findMaxId();


    List<BonCommande> findByEntreprise(Entreprise entreprise);


}