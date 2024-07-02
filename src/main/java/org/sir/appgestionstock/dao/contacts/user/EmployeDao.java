package org.sir.appgestionstock.dao.contacts.user;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface EmployeDao extends JpaRepository<Employe, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Employe findByAdresseId(Long id);
int deleteByEntrepriseId(Long id);
List<Employe> findByEntrepriseId(Long id);
@Query("SELECT NEW Employe(item.id,item.code) FROM Employe item")
List<Employe> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Employe item")
    Long findMaxId();
}