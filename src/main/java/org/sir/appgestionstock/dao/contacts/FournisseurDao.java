package org.sir.appgestionstock.dao.contacts;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface FournisseurDao extends JpaRepository<Fournisseur, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Fournisseur findByAdresseId(Long id);
int deleteByDevisesId(Long id);
List<Fournisseur> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Fournisseur> findByNiveauPrixId(Long id);
int deleteByTaxeId(Long id);
List<Fournisseur> findByTaxeId(Long id);
int deleteByEntrepriseId(Long id);
List<Fournisseur> findByEntrepriseId(Long id);
@Query("SELECT NEW Fournisseur(item.id,item.nom) FROM Fournisseur item")
List<Fournisseur> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Fournisseur item")
    Long findMaxId();
}