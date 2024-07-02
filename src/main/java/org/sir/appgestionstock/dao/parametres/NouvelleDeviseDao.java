package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface NouvelleDeviseDao extends JpaRepository<NouvelleDevise, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<NouvelleDevise> findByEntrepriseId(Long id);
}