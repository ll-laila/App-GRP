package org.sir.appgestionstock.service.facade.ventes;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface PaiementService {

double getIncome(Long entrepriseId);
    Paiement findByIdFacture(Long id);

    Paiement findById(Long id);
    List<Paiement> getPaiements(Long id);

    List<Paiement> findAllOptimized();
List<Paiement> findAll();
Pagination<Paiement> findPaginated(int page, int size);
Paiement create(Paiement item);
List<Paiement> create(List<Paiement> item);
Paiement update(Paiement item);
List<Paiement> update(List<Paiement> item);
void deleteById(Long id);
void delete(Paiement item);
void delete(List<Paiement> items);
void deleteByIdIn(List<Long> ids);
int deleteByMethodePaiementId(Long id);
List<Paiement> findByMethodePaiementId(Long id);
int deleteByEntrepriseId(Long id);
List<Paiement> findByEntrepriseId(Long id);
}
