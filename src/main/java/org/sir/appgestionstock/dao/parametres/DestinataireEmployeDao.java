package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface DestinataireEmployeDao extends JpaRepository<DestinataireEmploye, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByEmployeId(Long id);
List<DestinataireEmploye> findByEmployeId(Long id);
int deleteByAlerteId(Long id);
List<DestinataireEmploye> findByAlerteId(Long id);
}