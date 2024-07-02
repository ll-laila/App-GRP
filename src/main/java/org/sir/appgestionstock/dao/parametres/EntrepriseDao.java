package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface EntrepriseDao extends JpaRepository<Entreprise, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Entreprise findByAdresseId(Long id);
}