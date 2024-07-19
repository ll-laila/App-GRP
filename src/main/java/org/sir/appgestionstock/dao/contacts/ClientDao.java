package org.sir.appgestionstock.dao.contacts;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
public interface ClientDao extends JpaRepository<Client, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Client findByAdresseId(Long id);
int deleteByDevisesId(Long id);
List<Client> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Client> findByNiveauPrixId(Long id);
int deleteByTaxeId(Long id);
List<Client> findByTaxeId(Long id);
int deleteByEntrepriseId(Long id);
List<Client> findByEntrepriseId(Long id);
@Query("SELECT NEW Client(item.id,item.nom) FROM Client item")
List<Client> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Client item")
    Long findMaxId();


    List<Client> findAllByEntrepriseIdAndCreationDateBetween(Long entrepriseId, LocalDate startDate, LocalDate endDate);

}