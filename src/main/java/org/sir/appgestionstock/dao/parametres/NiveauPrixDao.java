package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface NiveauPrixDao extends JpaRepository<NiveauPrix, Long> {
int deleteByIdIn(List<Long> ids);
}