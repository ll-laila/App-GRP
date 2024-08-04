package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface NiveauPrixDao extends JpaRepository<NiveauPrix, Long> {
int deleteByIdIn(List<Long> ids);

    @Query("SELECT n FROM NiveauPrix n WHERE n.idEntreprise = :entrepriseId")
    List<NiveauPrix> findByEntreprise(@Param("entrepriseId") Long entrepriseId);
}