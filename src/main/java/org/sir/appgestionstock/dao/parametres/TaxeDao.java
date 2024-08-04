package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface TaxeDao extends JpaRepository<Taxe, Long> {
int deleteByIdIn(List<Long> ids);

    @Query("SELECT t FROM Taxe t WHERE t.idEntreprise = :entrepriseId")
    List<Taxe> findByEntreprise(@Param("entrepriseId") Long entrepriseId);

}