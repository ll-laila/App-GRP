package org.sir.appgestionstock.service.facade.ventes.commande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface CommandeService {

double getNbCommandes(Long entrepriseId);
List<Commande> getCommandes(Long entrepriseId);
Commande findById(Long id);
List<Commande> findAllOptimized();
List<Commande> findAll();
Pagination<Commande> findPaginated(int page, int size);
Commande create(Commande item);
List<Commande> create(List<Commande> item);
Commande update(Commande item);
List<Commande> update(List<Commande> item);
void deleteById(Long id);
void delete(Commande item);
void delete(List<Commande> items);
void deleteByIdIn(List<Long> ids);
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
    void commandeFacture(Long idC,Long idF);


    Long findMaxId();
}