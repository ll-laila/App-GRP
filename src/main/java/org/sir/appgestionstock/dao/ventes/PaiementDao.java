package org.sir.appgestionstock.dao.ventes;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface PaiementDao extends JpaRepository<Paiement, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByMethodePaiementId(Long id);
List<Paiement> findByMethodePaiementId(Long id);
int deleteByEntrepriseId(Long id);
List<Paiement> findByEntrepriseId(Long id);
    @Query("SELECT MAX(item.id) FROM Paiement item")
    Long findMaxId();

    Paiement findByIdFacture(Long id);
    List<Paiement> findByIdEntreprise(Long id);
}
