package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface AlerteDao extends JpaRepository<Alerte, Long> {
int deleteByIdIn(List<Long> ids);


}