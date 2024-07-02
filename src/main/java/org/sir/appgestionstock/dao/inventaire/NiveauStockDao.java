package org.sir.appgestionstock.dao.inventaire;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface NiveauStockDao extends JpaRepository<NiveauStock, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<NiveauStock> findByEntrepriseId(Long id);

}