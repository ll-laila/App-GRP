package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface EntrepriseService {
Entreprise findById(Long id);
List<Entreprise> findAllOptimized();
List<Entreprise> findAll();
Pagination<Entreprise> findPaginated(int page, int size);
Entreprise create(Entreprise item);
List<Entreprise> create(List<Entreprise> item);
Entreprise update(Entreprise item);
List<Entreprise> update(List<Entreprise> item);
void deleteById(Long id);
void delete(Entreprise item);
void delete(List<Entreprise> items);
void deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Entreprise findByAdresseId(Long id);
List<Entreprise> findEntrepriseByAdmin(String idAdmin);

List<Entreprise> findEntrepriseDroitAcces(Long idEmploye);
}