package org.sir.appgestionstock.service.facade.inventaire;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface NiveauStockService {
NiveauStock findById(Long id);
List<NiveauStock> getNiveauStock(Long id);
List<NiveauStock> findAllOptimized();
List<NiveauStock> findAll();
Pagination<NiveauStock> findPaginated(int page, int size);
NiveauStock create(NiveauStock item);
List<NiveauStock> create(List<NiveauStock> item);
NiveauStock update(NiveauStock item);
List<NiveauStock> update(List<NiveauStock> item);
void deleteById(Long id);
void delete(NiveauStock item);
void delete(List<NiveauStock> items);
void deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<NiveauStock> findByEntrepriseId(Long id);

}