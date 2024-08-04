package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface DevisesService {
Devises findById(Long id);
List<Devises> findAllOptimized();
List<Devises> findAll();
Pagination<Devises> findPaginated(int page, int size);
Devises create(Devises item);
List<Devises> create(List<Devises> item);
Devises update(Devises item);
List<Devises> update(List<Devises> item);
void deleteById(Long id);
void delete(Devises item);
void delete(List<Devises> items);
void deleteByIdIn(List<Long> ids);
int deleteByNouvelleDeviseId(Long id);
List<Devises> findByNouvelleDeviseId(Long id);
int deleteByEntrepriseId(Long id);
List<Devises> findByEntrepriseId(Long id);
    List<Devises> findByEntreprise(Long id);

}