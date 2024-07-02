package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface TaxeDao extends JpaRepository<Taxe, Long> {
int deleteByIdIn(List<Long> ids);
}