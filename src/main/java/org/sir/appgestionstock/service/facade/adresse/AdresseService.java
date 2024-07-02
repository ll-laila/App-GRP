package org.sir.appgestionstock.service.facade.adresse;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface AdresseService {
Adresse findById(Long id);
List<Adresse> findAllOptimized();
List<Adresse> findAll();
Pagination<Adresse> findPaginated(int page, int size);
Adresse create(Adresse item);
List<Adresse> create(List<Adresse> item);
Adresse update(Adresse item);
List<Adresse> update(List<Adresse> item);
void deleteById(Long id);
void delete(Adresse item);
void delete(List<Adresse> items);
void deleteByIdIn(List<Long> ids);
int deleteByPaysId(Long id);
List<Adresse> findByPaysId(Long id);
}