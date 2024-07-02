package org.sir.appgestionstock.dao.adresse;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface AdresseDao extends JpaRepository<Adresse, Long> {
int deleteByIdIn(List<Long> ids);
int deleteByPaysId(Long id);
List<Adresse> findByPaysId(Long id);
}