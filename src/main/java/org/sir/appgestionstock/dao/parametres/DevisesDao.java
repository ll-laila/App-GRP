package org.sir.appgestionstock.dao.parametres;

import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface DevisesDao extends JpaRepository<Devises, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByNouvelleDeviseId(Long id);
List<Devises> findByNouvelleDeviseId(Long id);
int deleteByEntrepriseId(Long id);
List<Devises> findByEntrepriseId(Long id);

    @Query("SELECT d FROM Devises d WHERE d.idEntreprise = :entrepriseId")
    List<Devises> findByEntreprise(@Param("entrepriseId") Long entrepriseId);

}