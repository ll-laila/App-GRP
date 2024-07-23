package org.sir.appgestionstock.service.facade.contacts;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
import java.util.Map;

public interface ClientService {

Map<String, Map<String, Long>> getClientStatsForCurrentWeek(Long idEntreprise);
double getNbClients(Long idEntreprise);
List<Client> getClients(Long idEntreprise);
Client findById(Long id);
List<Client> findAllOptimized();
List<Client> findAll();
Pagination<Client> findPaginated(int page, int size);
Client create(Client item);
List<Client> create(List<Client> item);
Client update(Client item);
List<Client> update(List<Client> item);
void deleteById(Long id);
void delete(Client item);
void delete(List<Client> items);
void deleteByIdIn(List<Long> ids);
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
    Long findMaxId();
}