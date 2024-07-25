package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.Application;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface EntrepriseDao extends JpaRepository<Entreprise, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Entreprise findByAdresseId(Long id);

List<Entreprise> getEntrepriseByIdAdmin(Long admin);

    @Query("SELECT e.entreprisesAdroitAcces FROM Employe e WHERE e.id = :employeId")
    List<Entreprise> findEntreprisesByEmployeId(@Param("employeId") Long employeId);

    List<Entreprise> findByIdAdmin(Long id);

}