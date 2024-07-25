package org.sir.appgestionstock.dao.contacts.user;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface EmployeDao extends JpaRepository<Employe, Long> {

    List<Employe> findByEntreprise(Entreprise entreprise);

    int deleteByIdIn(List<Long> ids);
    int deleteByAdresseId(Long id);
    Employe findByAdresseId(Long id);
    Employe findByUsername(String username);

    @Query("SELECT p FROM Employe e JOIN e.permissionsAcces p WHERE e.id = :id")
    List<PermissionsAcces> findEmployePermissionsByIdEmploye(@Param("id") Long id);

    int deleteByEntrepriseId(Long id);
    List<Employe> findByEntrepriseId(Long id);
    @Query("SELECT NEW Employe(item.id,item.code) FROM Employe item")
    List<Employe> findAllOptimized();
    @Query("SELECT MAX(item.id) FROM Employe item")
    Long findMaxId();


    @Query("SELECT e FROM Employe e JOIN e.notifications n WHERE n.id = :notificationId")
    Employe findByNotificationId(@Param("notificationId") Long notificationId);

}
