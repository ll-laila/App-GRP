package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface DestinataireEmployeService {
DestinataireEmploye findById(Long id);
List<DestinataireEmploye> findAllOptimized();
List<DestinataireEmploye> findAll();
Pagination<DestinataireEmploye> findPaginated(int page, int size);
DestinataireEmploye create(DestinataireEmploye item);
List<DestinataireEmploye> create(List<DestinataireEmploye> item);
DestinataireEmploye update(DestinataireEmploye item);
List<DestinataireEmploye> update(List<DestinataireEmploye> item);
void deleteById(Long id);
void delete(DestinataireEmploye item);
void delete(List<DestinataireEmploye> items);
void deleteByIdIn(List<Long> ids);
int deleteByEmployeId(Long id);
List<DestinataireEmploye> findByEmployeId(Long id);
int deleteByAlerteId(Long id);
List<DestinataireEmploye> findByAlerteId(Long id);
}