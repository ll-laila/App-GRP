package org.sir.appgestionstock.dao.adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface PaysDao extends JpaRepository<Pays, Long> {
int deleteByIdIn(List<Long> ids);
@Query("SELECT NEW Pays(item.id,item.name) FROM Pays item")
List<Pays> findAllOptimized();
}