package org.sir.appgestionstock.dao.parametres;

import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface NouvelleDeviseDao extends JpaRepository<NouvelleDevise, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
    @Query("SELECT n FROM NouvelleDevise n WHERE n.idEntreprise = :entrepriseId")
    List<NouvelleDevise> findByEntreprise(@Param("entrepriseId") Long entrepriseId);}