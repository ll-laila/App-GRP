package org.sir.appgestionstock.service.facade.adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface PaysService {
Pays findById(Long id);
List<Pays> findAllOptimized();
List<Pays> findAll();
Pagination<Pays> findPaginated(int page, int size);
Pays create(Pays item);
List<Pays> create(List<Pays> item);
Pays update(Pays item);
List<Pays> update(List<Pays> item);
void deleteById(Long id);
void delete(Pays item);
void delete(List<Pays> items);
void deleteByIdIn(List<Long> ids);
}