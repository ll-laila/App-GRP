package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface EntrepriseDevisesDao extends JpaRepository<EntrepriseDevises, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<EntrepriseDevises> findByEntrepriseId(Long id);
int deleteByDevisesId(Long id);
List<EntrepriseDevises> findByDevisesId(Long id);
}