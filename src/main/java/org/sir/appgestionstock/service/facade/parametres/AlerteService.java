package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface AlerteService {
Alerte findById(Long id);
List<Alerte> findAllOptimized();
List<Alerte> findAll();
Pagination<Alerte> findPaginated(int page, int size);
Alerte create(Alerte item);
List<Alerte> create(List<Alerte> item);
Alerte update(Alerte item);
List<Alerte> update(List<Alerte> item);
void deleteById(Long id);
void delete(Alerte item);
void delete(List<Alerte> items);
void deleteByIdIn(List<Long> ids);

}