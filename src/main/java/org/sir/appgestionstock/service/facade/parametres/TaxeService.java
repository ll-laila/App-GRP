package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface TaxeService {
Taxe findById(Long id);
List<Taxe> findAllOptimized();
List<Taxe> findAll();
Pagination<Taxe> findPaginated(int page, int size);
Taxe create(Taxe item);
List<Taxe> create(List<Taxe> item);
Taxe update(Taxe item);
List<Taxe> update(List<Taxe> item);
void deleteById(Long id);
void delete(Taxe item);
void delete(List<Taxe> items);
void deleteByIdIn(List<Long> ids);

List<Taxe> findNiveauPrixByEntreprise(Long id);
}