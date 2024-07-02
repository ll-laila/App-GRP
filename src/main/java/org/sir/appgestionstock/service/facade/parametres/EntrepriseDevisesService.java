package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface EntrepriseDevisesService {
EntrepriseDevises findById(Long id);
List<EntrepriseDevises> findAllOptimized();
List<EntrepriseDevises> findAll();
Pagination<EntrepriseDevises> findPaginated(int page, int size);
EntrepriseDevises create(EntrepriseDevises item);
List<EntrepriseDevises> create(List<EntrepriseDevises> item);
EntrepriseDevises update(EntrepriseDevises item);
List<EntrepriseDevises> update(List<EntrepriseDevises> item);
void deleteById(Long id);
void delete(EntrepriseDevises item);
void delete(List<EntrepriseDevises> items);
void deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<EntrepriseDevises> findByEntrepriseId(Long id);
int deleteByDevisesId(Long id);
List<EntrepriseDevises> findByDevisesId(Long id);
}