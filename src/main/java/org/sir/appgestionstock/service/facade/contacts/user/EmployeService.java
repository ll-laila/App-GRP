package org.sir.appgestionstock.service.facade.contacts.user;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface EmployeService {

Employe findByUsername(String username);
Employe getEmployeeByNotificationId(Long notificationId);
Employe findById(Long id);
List<Employe> findAllOptimized();
List<Employe> findAll();
Pagination<Employe> findPaginated(int page, int size);
Employe create(Employe item);
List<Employe> create(List<Employe> item);
Employe update(Employe item);
List<Employe> update(List<Employe> item);
void deleteById(Long id);
void delete(Employe item);
void delete(List<Employe> items);
void deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Employe findByAdresseId(Long id);
int deleteByEntrepriseId(Long id);
List<Employe> findByEntrepriseId(Long id);
    Long findMaxId();
}
